import express from "express";
import { validationResult } from "express-validator";
import { getSectionData } from "../services/services.js";

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
  "dashboard"
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
    return res.redirect("/admin/dashboard");

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
