import { Router } from "express"
import { AtletasController } from "../controller/atletasController.js"
import { authenticateToken } from "../middlewares/authentication.js"

const atletasController = new AtletasController

export const atletas = Router()

atletas.get("/", authenticateToken, atletasController.index)
atletas.put("/:id", authenticateToken, atletasController.update)
atletas.delete("/:id", authenticateToken, atletasController.delete)