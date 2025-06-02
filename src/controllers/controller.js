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
    const sectionData = await getSectionData(section);

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

  res.render("partials/layout", data);
};