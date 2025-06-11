import { Router } from "express";
import { renderHome, postForm, getPublicReports } from "../controllers/controller.js";
import { body } from "express-validator";


const router = Router();

// Public SPA
router.get("/", renderHome);

router.get("/reports-map", getPublicReports)

router.post("/contact",
    [
        body("reason").notEmpty().withMessage("Reason is required"),
        body("contactUsEmail").isEmail().withMessage("Valid email required"),
        body("message").notEmpty().withMessage("Message is required")
    ],
    postForm
);

// Admin MPA
router.post("/subscribe",
    [
        body("emailServiceEmail").isEmail().withMessage("Valid email required"),
    ],
    postForm
);

router.post("/report",
    [
        body("latitude").notEmpty().withMessage("latitude is required"),
        body("longitude").notEmpty().withMessage("longitude is required"),
        body("report_type").notEmpty().withMessage("Report type is required"),
        body("description").notEmpty().withMessage("Description is required")
    ],
    postForm
);



export { router };