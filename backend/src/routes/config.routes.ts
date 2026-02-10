import { Router} from "express"
import { ConfigController } from "../controller/configController.js"
import { authenticateToken } from "../middlewares/authentication.js"

const configController = new ConfigController

export const configRoutes = Router()

configRoutes.post("/", authenticateToken,configController.create)
configRoutes.get("/", authenticateToken,configController.index)