import { Router } from "express";   
import { SchedulesRoutes } from "./schedules.routes.js";
import { SessionController } from "../controller/SessionController.js";
import { AtletaController } from "../controller/AtletaController.js";

export const routes = Router();
const sessionController = new SessionController();
const atletaController = new AtletaController();


routes.use("/schedules", SchedulesRoutes);
routes.post("/login", sessionController.store);
routes.post("/atletas", atletaController.store);