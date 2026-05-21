import { Router } from "express";
import { executeCommand } from "../controllers/commandController.js";

export const commandRouter = Router();

commandRouter.post("/", executeCommand);
