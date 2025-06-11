// Save email subscription
import { pool } from "../db/index-db.js";

// Save email subscription
export async function saveEmailService(data) {
  const {
    forename = null,
    surname = null,
    emailServiceEmail,
    newsletter = false,
    emergencies = false
  } = data;

  const query = `
    INSERT INTO contacts (first_name, last_name, email, emailNewsletter, emailEmergency)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [forename, surname, emailServiceEmail, newsletter, emergencies];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    if (err.code === '23505') {
      const error = new Error('This email is already subscribed.');
      error.status = 409;
      throw error;
    }
    console.error("Error saving email service data:", err);
    throw err;
  }
}

// Save Report Submission
export async function saveReport(data) {
  const {
    report_type,
    latitude,
    longitude,
    description
  } = data;

  const query = `
    INSERT INTO report (report_type, latitude, longitude, context)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [report_type, latitude, longitude, description];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error saving report:", err);
    throw err;
  }
}

// Get daily counts of verified/unverified reports for last 30 days
export async function fetchReportCountsData() {
  const query = `
    SELECT
      TO_CHAR(created_at::DATE, 'YYYY-MM-DD') AS date,
      report_type,
      verified,
      COUNT(*) AS count
    FROM report
    GROUP BY date, report_type, verified
    ORDER BY date ASC;
  `;

  const { rows } = await pool.query(query);

  // Prepare containers
  const datesSet = new Set();
  const reportTypes = ["theft", "leak", "water_point"];


  const dataMaps = {};
  for (const type of reportTypes) {
    dataMaps[type] = {
      verified: new Map(),
      unverified: new Map(),
    };
  }

  // Fill maps and collect all dates
  rows.forEach(({ date, report_type, verified, count }) => {
    datesSet.add(date);
    if (!reportTypes.includes(report_type)) return;

    const key = verified ? "verified" : "unverified";
    dataMaps[report_type][key].set(date, parseInt(count, 10));
  });

  // Sort dates to form labels
  const labels = Array.from(datesSet).sort();

  // Map counts per date, default to 0 if no data
  const data = {};
  for (const type of reportTypes) {
    data[type] = {
      verified: labels.map(date => dataMaps[type].verified.get(date) || 0),
      unverified: labels.map(date => dataMaps[type].unverified.get(date) || 0),
    };
  }

  return { labels, data };
}

// fetchest the 3 report stats from the database
export async function fetchReportStats() {
  const query = `
    SELECT
      COUNT(*) AS total_reports,
      COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) AS last_week_reports,
      COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' AND verified = TRUE THEN 1 END) AS last_week_verified_reports
    FROM report;
  `;

  const { rows } = await pool.query(query);
  // rows[0] will contain the counts as strings, convert to number
  return {
    totalReports: parseInt(rows[0].total_reports, 10),
    lastWeekReports: parseInt(rows[0].last_week_reports, 10),
    lastWeekVerifiedReports: parseInt(rows[0].last_week_verified_reports, 10),
  };
}

// Fetch all pins from database for map.js
export async function fetchAllReports() {
  const query = `
    SELECT id, report_type, latitude, longitude, context, verified, created_at
    FROM report
    WHERE verified = TRUE -- or omit if you want all
    ORDER BY created_at DESC;
  `;

  const { rows } = await pool.query(query);
  return rows; 
}




