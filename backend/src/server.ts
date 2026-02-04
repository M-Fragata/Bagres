import express from "express"
import cors from "cors"
import { routes } from "./routes/index.js"

const app = express()

const PORT = process.env.PORT || 3333 

// 1. Configura as regras
const corsOptions = {
  origin: "https://bagres-7mcv.onrender.com", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// 2. Aplica o CORS em todas as requisições
app.use(cors(corsOptions));

// 3. Responde o "Preflight" (OPTIONS) de forma ultra rápida
app.options("(.*)", cors(corsOptions));

app.use(express.json())

app.use(routes)

app.listen(PORT, () => console.log(`Server is running`))