import { Router } from "express";   
import { SchedulesRoutes } from "./schedules.routes.js";
import { LoginRoutes } from "./login.routes.js"
import { SessionRoutes } from "./newSession.routes.js";
import { botTelegram } from "./botTelegram.routes.js"
import { atletas } from "./atletas.routes.js"
import { configRoutes } from "./config.routes.js"

export const routes = Router();

routes.use("/schedules", SchedulesRoutes);
routes.use("/login", LoginRoutes);
routes.use("/session", SessionRoutes);
routes.use("/agenda", botTelegram)
routes.use("/atletas", atletas)
routes.use("/config", configRoutes)
