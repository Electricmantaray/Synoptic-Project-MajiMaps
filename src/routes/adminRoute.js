import { Router } from "express";
import { getLoginPage, postLogin, getDashboard, requireAdminAuth } from "../controllers/adminController.js";
import { body } from "express-validator";


const router = Router();

// Private admin pages
router.get("/login", getLoginPage);
router.post("/login", postLogin);

router.get("/dashboard", requireAdminAuth, getDashboard);



export { router };