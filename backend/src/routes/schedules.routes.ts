import { Router} from "express"
import { SchedulesController } from "../controller/scheduleController.js"

export const SchedulesRoutes = Router()

const schedulesController = new SchedulesController()


SchedulesRoutes.get("/", schedulesController.index)
SchedulesRoutes.post("/", schedulesController.create)
SchedulesRoutes.put("/:id", schedulesController.update)
SchedulesRoutes.delete("/:id", schedulesController.delete)