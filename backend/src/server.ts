import express from "express"
import cors from "cors"
import { routes } from "./routes/index.js"

const app = express()

const PORT = process.env.PORT || 3333 

app.use(cors({
  // Adicione aqui a URL do seu site no Render
  origin: ["https://bagres-7mcv.onrender.com", "http://localhost:5173"], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Adicionei OPTIONS aqui
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // Caso você use cookies futuramente
}))

app.use(express.json())

app.use(routes)

app.listen(PORT, () => console.log(`Server is running`))