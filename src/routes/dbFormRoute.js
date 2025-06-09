import express from "express";
import { postEmailService, postReport } from "../controllers/formController.js";

const router = express.Router();

router.post("/subscribe",
    [
        body("emailServiceEmail").isEmail().withMessage("Valid email required"),
    ],
    postForm
);

router.post("/report",
    [
        body("location").notEmpty().withMessage("Location is required"),
        body("type").notEmpty().withMessage("Report type is required"),
        body("description").notEmpty().withMessage("Description is required")
    ],
    postForm
);

export { router };
