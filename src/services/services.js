import fs from "fs";

// caching system
const cache = {};


// Loading JSON from a specific "page"/section
async function getSectionData(section) {
  // returns cache if present
  if (cache[section]) {
    return cache[section]
  }

  const filePath = `src/data/${section}.json`;

  if (fs.existsSync(filePath)) {
    const parsedData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Caches current parsed section for future calls
    cache[section] = parsedData;

    return parsedData;
  }
  return {};
}

export { getSectionData }
