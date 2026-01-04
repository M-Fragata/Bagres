import express from "express";
import cors from "cors"
import { bagreRoutes } from "./routes/scheduleRoutes.js"
import { DataBase } from "./mongoDB/DataBase.js";

const app = express()

app.use(express.json());
app.use(cors())

//Utilizando as rotas
app.use("/", bagreRoutes)

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT)
    DataBase();
})