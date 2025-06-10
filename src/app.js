import express from "express";
import expressRateLimit from "express-rate-limit";
import { router as mainRouter } from "./routes/routes.js";
import { router as adminRouter } from "./routes/adminRoute.js";
import session from "express-session"
import dotenv from "dotenv";
dotenv.config()

const app = express();

// set rate limit
const rateLimit = expressRateLimit({
    max: 100,
    // 15 minutes
    windowMs: 5 * 60 * 1000,
    message: "Too many requests, Timed out for 5 minutes",
});

// App config
app.set("views", "src/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());
app.use(rateLimit);

// Session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: process.env.COOKIE_SECURE === "true" },
    })
);

app.use("/", mainRouter);
app.use('/admin', adminRouter);


export { app };