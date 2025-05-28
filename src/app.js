import express from "express";
import { router } from "./routes/routes.js";

const app = express();

// middleware
app.set("views", "src/views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", router);

export { app };