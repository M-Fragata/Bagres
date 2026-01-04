import express from "express";

import { DataBase } from "./mongoDB/DataBase.js";

const app = express()

app.use(express.json());

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT)
    DataBase();
})