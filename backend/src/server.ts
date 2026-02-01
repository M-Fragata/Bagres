import express from "express"
import cors from "cors"
import { routes } from "./routes/index.js"

const app = express()

app.use(cors({
  origin: "*", // Durante o desenvolvimento, o "*" libera qualquer frontend (localhost:5173, etc)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())

app.use(routes)

app.listen(3333, () => console.log("Server is running on port 3333"))