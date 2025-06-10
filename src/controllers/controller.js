import express from "express";
import { validationResult } from "express-validator";

import { getSectionData } from "../services/services.js";
import { sendContactUsEmail } from "../services/emailService.js";
import { saveEmailService, saveReport } from "../services/pgService.js";

// ========== Main Page Controller ==========
// array of current sections to iterate through
const mainSections = [
  "common",
  "hero",
  "introduction",
  "maps",
  "report",
  "contacts",
  "team"
];

// Gathers all component data
export const renderHome = async (req, res) => {
  const data = {};

  console.warn("\n########## RENDER MAIN ##########\n#################################")

  for (const section of mainSections) {
    let sectionData;


    if (section === "common") {
      sectionData = await getSectionData("common", section)
    } else {
      sectionData = await getSectionData("main", section);
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

  res.render("main/pages/layout", data);
};


// Handling Form Posts
export const postForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      path: err.param,
      message: err.msg
    }));
    return res.status(400).json({ error: formattedErrors });
  }

  if (req.path === "/contact") {
    try {
      await sendContactUsEmail(req.body);
      return res.json({ message: "Contact message sent" });
    } catch (err) {
      return res.status(500).json({ error: "Failed to send" });
    }
  }

  if (req.path == "/subscribe") {

    try {
      const saved = await saveEmailService(req.body);
      return res.status(200).json({ success: true, saved });
    } catch (error) {
      console.error("Email Service Save Failed:", error);
      let statusCode = error.status || 500;
  
      return res.status(statusCode).json({ error: error.message || "Internal Server Error" });
    }

  }

  if (req.path == "/report") {

    try {
      const saved = await saveReport(req.body);
      return res.status(200).json({ success: true, saved });
    } catch (error) {
      console.error("Report Save Failed:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(400).json({ error: "Unknown form submission" });

};
