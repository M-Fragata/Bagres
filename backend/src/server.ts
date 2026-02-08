import 'dotenv/config'
import express from "express"
import cors from "cors"
import { routes } from "./routes/index.js"
import { bot } from "./bot.js"

const app = express()

const PORT = process.env.PORT || 3333 

// 1. Configura as regras
app.use(cors({
  origin: "*", // Libera geral para testarmos e garantir que o login passe
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is running`)

  bot.launch()
        .then(() => console.log("🤖 Telegram Bot is listening..."))
        .catch((err) => console.error("Erro ao iniciar bot:", err));

})