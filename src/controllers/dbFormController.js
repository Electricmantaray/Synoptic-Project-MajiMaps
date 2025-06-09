import { saveEmailService, saveReport } from "../services/dbService.js";

// Email Form POST
export const postEmailService = async (req, res) => {
  try {
    const saved = await saveEmailService(req.body);
    res.status(200).json({ success: true, saved });
  } catch (error) {
    console.error("Email Service Save Failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Report Form POST
export const postReport = async (req, res) => {
  try {
    const saved = await saveReport(req.body);
    res.status(200).json({ success: true, saved });
  } catch (error) {
    console.error("Report Save Failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
