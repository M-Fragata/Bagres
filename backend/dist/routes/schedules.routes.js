import { Router } from "express";
import { SchedulesController } from "../controller/scheduleController.js";
import { authenticateToken } from "../middlewares/authentication.js";
export const SchedulesRoutes = Router();
const schedulesController = new SchedulesController();
SchedulesRoutes.get("/", authenticateToken, schedulesController.index);
SchedulesRoutes.post("/", authenticateToken, schedulesController.create);
SchedulesRoutes.put("/:id", authenticateToken, schedulesController.update);
SchedulesRoutes.delete("/:id", authenticateToken, schedulesController.delete);
//# sourceMappingURL=schedules.routes.js.map