import { pool } from "../db/index-db.js";

// Save email subscription
export async function saveEmailService(data) {
    const { forename, surname, email, newsletter, emergency,  } = data;
    const query = `
    INSERT INTO email_service (forename, surname, email, newsletter, emerggency)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `;
    const values = [forename, surname, email, newsletter, emergency];
    const result = await pool.query(query, values);
    return result.rows[0];
}

// Save Report Submission
export async function saveReport(data) {
  const { report_type, latitude, longitude, context } = data;
  const query = `
    INSERT INTO report (report_type, latitude, longitude, context)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [report_type, latitude, longitude, context];

  const result = await pool.query(query, values);
    return result.rows[0];
}