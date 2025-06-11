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
      verified,
      COUNT(*) AS count
    FROM report
    GROUP BY date, verified
    ORDER BY date ASC;
  `;

  const { rows } = await pool.query(query);

  const datesSet = new Set();
  const verifiedMap = new Map();
  const unverifiedMap = new Map();

  rows.forEach(({ date, verified, count }) => {
    datesSet.add(date);
    if (verified) {
      verifiedMap.set(date, parseInt(count, 10));
    } else {
      unverifiedMap.set(date, parseInt(count, 10));
    }
  });

  const labels = Array.from(datesSet).sort();
  const verifiedData = labels.map(date => verifiedMap.get(date) || 0);
  const unverifiedData = labels.map(date => unverifiedMap.get(date) || 0);

  return {
    labels,
    verifiedCounts: verifiedData,
    unverifiedCounts: unverifiedData,
  };
}
