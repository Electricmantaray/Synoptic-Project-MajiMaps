import dotenv from "dotenv";
import { app } from "./app.js";

// Loading the .env file
dotenv.config();
const PORT = process.env.PORT;

// Run webserver
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});