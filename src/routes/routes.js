import { Router } from "express";
import { renderHome, postForm } from "../controllers/controller.js";
import { body } from "express-validator";


const router = Router();

// Public SPA
router.get("/", renderHome);

router.post("/contact",
    [
        body("reason").notEmpty().withMessage("Reason is required"),
        body("contactUsEmail").isEmail().withMessage("Valid email required"),
        body("message").notEmpty().withMessage("Message is required")
    ],
    postForm
);


export { router };