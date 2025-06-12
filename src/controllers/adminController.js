import express from "express";
import { validationResult } from "express-validator";
import { getSectionData } from "../services/services.js";
import { fetchReportCountsData, fetchReportStats, fetchAllReports, fetchEmailSubscribers, deleteContactByEmail } from "../services/pgService.js";
import { sendCSVEmail, sendEmailsToSubscribers } from "../services/emailService.js";
import { Parser } from "json2csv";

import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config()

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

// ========== Admin Page Controller ==========
/// === Login ===

export const getLoginPage = async (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.redirect("/admin/dashboard");
  }

    const loginData = await getSectionData("admin", "login");
    const commonData = await getSectionData("common", "common");
    res.render("admin/pages/login", { login:loginData, common: commonData });
};


// === Dashboard ===
// array of current sections to iterate through
const adminSections = [
  "common",
  "dashboardStats",
  "dashboardMap",
  "dashboardGraph",
  "dashboardData"  
];

// Gathers all component data
export const getDashboard = async (req, res) => {
  const data = {};

  console.warn("\n########## RENDER DASHBOARD ##########\n############################")

  for (const section of adminSections) {
    let sectionData;


    if (section === "common") {
      sectionData = await getSectionData("common", section)
    } else {
      sectionData = await getSectionData("admin", section);
    }

    // Check for empty object or json if so they return null
    // TODO: Improve this section
    const isEmpty = sectionData === null ||
      (Array.isArray(sectionData) && sectionData.length === 0) ||
      (typeof sectionData === "object" && Object.keys(sectionData).length === 0)

    if (isEmpty) {
      console.warn(`Skipping empty/missing section: ${section}`)
      // Skips
      continue
    }
    // Update state cards with live information
    if (section === "dashboardStats") {
      try {
        // Fetch the live stats from the DB
        const stats = await fetchReportStats();

        // Replace the cards array with real data dynamically:
        sectionData.cards = [
          {
            title: "Total Reports",
            stat: stats.totalReports ?? 0,  // fallback to 0 if undefined
          },
          {
            title: "Reports in Last Week",
            stat: stats.lastWeekReports ?? 0,
          },
          {
            title: "Verified Reports Last Week",
            stat: stats.lastWeekVerifiedReports ?? 0,
          },
        ];
      } catch (err) {
        console.error("Failed to fetch report stats for dashboardStats:", err);
        // Optionally keep the old cards or set fallback empty stats here
        sectionData.cards = sectionData.cards || [];
      }
    }

    data[section] = sectionData
  }

  res.render("admin/pages/dashboard", data);
};

export const requireAdminAuth = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
      return next();
    }

    // ####################################
    return res.redirect("/admin/login")
};


// Handling Form Post
export const postLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      path: err.param,
      message: err.msg,
    }));
    return res.status(400).json({ error: formattedErrors });
  }

  const { adminEmail: email, adminPassword: password } = req.body;


  try {
    // Check email match
    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ error: [{ path: "adminEmail", message: "Email not found" }] });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isMatch) {
      return res.status(401).json({ error: [{ path: "adminPassword", message: "Invalid password" }] });
    }

    // Set session to store successful login credentials
    req.session.isAdmin = true;
    req.session.adminEmail = email;
    return res.json({ message: "Login successful", redirectUrl: "/admin/dashboard" });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }

};

// grabs report data
export const getReportCounts = async (req, res) => {
  try {
    const data = await fetchReportCountsData();
    res.json(data);
  } catch (err) {
    console.error("Error fetching report counts:", err);
    res.status(500).json({ error: "Failed to fetch report counts" });
  }
};

// grabs the report stats
export const getReportStats = async (req, res) => {
  try {
    const stats = await fetchReportStats();
    res.json(stats);
  } catch (err) {
    console.error("Error fetching report stats:", err);
    res.status(500).json({ error: "Failed to fetch report stats" });
  }
};

export const getReportAll = async (req, res) => {
  try {
    const reports = await fetchAllReports();
    res.json({ reports });
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};

// turns all reports into a csv 
const generateCSVFromReports = async () => {
  
  const reports = await fetchAllReports();

  if (!reports || reports.length === 0) {
    throw new Error('No report data to export.')
  }

  const fields = [
    { label: 'ID', value: 'id' },
    { label: 'Report Type', value: 'report_type' },
    { label: 'Latitude', value: 'latitude' },
    { label: 'Longitude', value: 'longitude' },
    { label: 'Context', value: 'context' },
    { label: 'Created At', value: 'created_at' },
    { label: 'Verified', value: 'verified' },
  ];

  const parser = new Parser({ fields });
  return parser.parse(reports);

};

export const exportReportsCSV = async (req, res) => {
  try {
    const csv = await generateCSVFromReports();

    const fileName = 'dashboard.csv';
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);
  } catch (err) {
    console.error('Error exporting CSV:', err);
    return res.status(500).send('Server error generating CSV');
  }
};


// sends csv to resources
export const sendCSVToResources = async (req, res) => {
  try {
    const csv = await generateCSVFromReports();
    await sendCSVEmail(csv);

    // Respond with success to be handled by SPA
    res.json({ success: true, message: "CSV emailed successfully." });
  } catch (err) {
    console.error("Failed to send CSV email:", err);
    res.status(500).json({ success: false, error: "Failed to send CSV email." });
  }
};

export const sendSubscriberEmails = async (req, res) => {
  try {
    const subscribers = await fetchEmailSubscribers();

    if (!subscribers.length) {
      return res.status(200).json({ success: false, message: "No subscribers to email." });
    }

    const sendResult = await sendEmailsToSubscribers(subscribers);
    return res.status(200).json({ success: true, ...sendResult });
  } catch (error) {
    console.error("Error in sendSubscriberEmails:", error);
    return res.status(500).json({ success: false, message: "Failed to send subscriber emails." });
  }
};

// deletes record from database
export const handleUnsubscribe = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send("Invalid unsubscribe link.");
  }

  try {
    await deleteContactByEmail(email);

  } catch (err) {
    console.error("Unsubscribe error:", err);
    res.status(500).send("An error occurred while processing your request.");
  }
};




