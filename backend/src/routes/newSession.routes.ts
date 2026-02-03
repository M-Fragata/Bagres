import { Router} from "express"
import { AtletaController } from "../controller/newAtletaController.js"

export const SessionRoutes = Router()

const sessionController = new AtletaController()

SessionRoutes.post("/", sessionController.create)