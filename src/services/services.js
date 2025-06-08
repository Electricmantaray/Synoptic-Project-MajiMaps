import fs from "fs";
import dotenv from "dotenv";
dotenv.config()

// caching system
const useCache = process.env.USE_CACHE === "true";
const cache = {};


// Loading JSON from a specific "page"/section
async function getSectionData(page, section) {

  // returns cache if present
  if (useCache && cache[section]) { return cache[section] }

  // Initialise filepath
  const filePath = `src/data/${page}/${section}.json`;

  // Checking if json file exists
  if (!fs.existsSync(filePath)) {
    console.warn(`\n====== WARNING =====\n${section}.json not found.`);
    return null
  }


  if (fs.existsSync(filePath)) {

    // Reads file
  const content = fs.readFileSync(filePath, "utf-8")  

  // Checking if json file has content
  if (!content.trim()) {
    console.warn(`\n====== WARNING =====\n${section}.json is empty. Skipping.`);
    return null;
  }

    const parsedData = JSON.parse(content);

    // Checking if content is completely empty when parsed
    if (Array.isArray(parsedData) && parsedData.length === 0) {
      console.warn(`\n====== WARNING =====\n${section}.json parsed is empty. Skipping.`);
      return null;
    }

    // Caches current parsed section for future calls
    if (useCache) {
      cache[section] = parsedData;
    }

    return parsedData;
  }
  return {};
}


export { getSectionData }
