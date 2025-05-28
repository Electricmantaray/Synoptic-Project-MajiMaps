import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getIndexData = async () => {
  const dataPath = path.join(__dirname, "../data/index.json");
  const jsonData = await readFile(dataPath, "utf-8");
  return JSON.parse(jsonData);
};