import { Router } from "express";
import { getLoginPage, postLogin, getDashboard, requireAdminAuth, getReportCounts, getReportAll, exportReportsCSV, sendCSVToResources, sendSubscriberEmails, handleUnsubscribe } from "../controllers/adminController.js";
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


router.get("/dashboard/report-data",requireAdminAuth, getReportCounts);
router.get("/dashboard/reports-map",requireAdminAuth, getReportAll);
router.get("/dashboard/reports-export",requireAdminAuth, exportReportsCSV);
router.get("/dashboard/email-csv",requireAdminAuth, sendCSVToResources);
router.get("/dashboard/email-subscribers",requireAdminAuth, sendSubscriberEmails);
router.get("/unsubscribe", handleUnsubscribe)

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/admin/login")
    })
});



export { router };