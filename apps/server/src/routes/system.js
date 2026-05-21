import { Router } from "express";
import { getSystemSnapshot, searchFiles } from "../controllers/systemController.js";

export const systemRouter = Router();

systemRouter.get("/snapshot", getSystemSnapshot);
systemRouter.get("/search", searchFiles);
