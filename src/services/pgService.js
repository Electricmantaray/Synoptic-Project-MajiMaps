// Save email subscription
import { pool } from "../db/index-db.js";

// Save email subscription
export async function saveEmailService(data) {
  const {
    forename = null,
    surname = null,
    emailServiceEmail,
    newsletter = false,
    emergency = false
  } = data;

  const query = `
    INSERT INTO contacts (first_name, last_name, email, emailNewsletter, emailEmergency)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [forename, surname, emailServiceEmail, newsletter, emergency];

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
