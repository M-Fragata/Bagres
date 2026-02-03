import { Router} from "express"
import { LoginController } from "../controller/LoginController.js"
import { authenticateToken } from "../middlewares/authentication.js"

export const LoginRoutes = Router()

const loginController = new LoginController()  
 
LoginRoutes.get("/", authenticateToken, loginController.index)
LoginRoutes.post("/", loginController.create)