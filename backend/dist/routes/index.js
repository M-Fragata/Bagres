import { Router } from "express";
import { SchedulesRoutes } from "./schedules.routes.js";
import { LoginRoutes } from "./login.routes.js";
import { SessionRoutes } from "./newSession.routes.js";
export const routes = Router();
routes.use("/schedules", SchedulesRoutes);
routes.use("/login", LoginRoutes);
routes.use("/session", SessionRoutes);
//# sourceMappingURL=index.js.map