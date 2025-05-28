import { Router } from "express";
import { getIndex } from "../controllers/controller.js";

const router = Router();
router.get("/", getIndex);


export { router };