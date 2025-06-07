import express from "express";
import expressRateLimit from "express-rate-limit";
import { router } from "./routes/routes.js";

const app = express();

// set rate limig
const rateLimit = expressRateLimit({
    max: 100,
    // 15 minutes
    windowMs: 5 * 60 * 1000,
    message: "Too many requests, Timed out for 5 minutes",
});

// middleware
app.set("views", "src/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());
app.use(rateLimit);
app.use("/", router);

export { app };