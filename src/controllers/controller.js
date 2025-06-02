import { getSectionData } from "../services/services.js";

// array of current sections to iterate through
const sections = [
  "common",
  "index",
  "maps",
  "report",
  "contacts",
  "team"
];

// Gathers all component data
export const renderHome = async (req, res) => {
  const data = {};

  for (const section of sections) {
    data[section] = await getSectionData(section);
  }

  res.render("layout". data);
};