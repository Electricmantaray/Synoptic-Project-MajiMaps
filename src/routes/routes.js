import { Router } from "express";
import { renderHome } from "../controllers/controller.js";

const router = Router();
router.get("/", renderHome);


export { router };