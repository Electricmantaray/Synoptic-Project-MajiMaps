import { Router } from "express";
import { renderHome, postForm } from "../controllers/controller.js";
import { body } from "express-validator";


const router = Router();

// Public SPA
router.get("/", renderHome);

// Private admin pages
router.get("/admin", renderAdminLogin);
router.get("/admin/dashboard", renderAdminDashboard);


router.post("/contact",
    [
        body("reason").notEmpty().withMessage("Reason is required"),
        body("contactUsEmail").isEmail().withMessage("Valid email required"),
        body("message").notEmpty().withMessage("Message is required")
    ],
    postForm
);

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