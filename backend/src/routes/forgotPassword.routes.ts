import { Router } from "express";
import { ForgotPasswordController } from "../controller/FogotPasswordController.js";

const forgotPasswordRoutes = Router();

const forgotPasswordController = new ForgotPasswordController();

forgotPasswordRoutes.post("/", forgotPasswordController.forgotPassword);

export { forgotPasswordRoutes };