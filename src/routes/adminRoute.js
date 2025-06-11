import { Router } from "express";
import { getLoginPage, postLogin, getDashboard, requireAdminAuth, getReportCounts } from "../controllers/adminController.js";
import { body } from "express-validator";


const router = Router();

// Private admin pages
router.get("/login", getLoginPage);
router.post("/login", 
    [
    body("adminEmail").isEmail().withMessage("Valid email required"),
    body("adminPassword").notEmpty().withMessage("Password is required")
    ],
    postLogin
);

router.get("/dashboard", requireAdminAuth, getDashboard);
router.get("/dashboard/report-data",requireAdminAuth, getReportCounts)

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/admin/login")
    })
});



export { router };