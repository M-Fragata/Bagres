import { BotTelegramController } from "../controller/botTelegram.js"
import { Router } from 'express'

export const botTelegram = Router()

const botTelegramController = new BotTelegramController()

botTelegram.get("/", botTelegramController.getDayReport)

//Caso queira colocar um botão de gerar relatorio no site