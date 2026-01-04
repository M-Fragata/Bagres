import { Router, Request, Response } from "express";
import { Bagre } from "../mongoDB/BagreSchema.js";

export const bagreRoutes = Router()


bagreRoutes.post('/schedules', async (req: Request, res: Response) => {
    try {
        const { name, date, hour } = req.body

        const newSchedule = await Bagre.create({ name, date, hour })

        return res.status(201).json(newSchedule)
    } catch (error) {
        return res.status(500).json({ error: "Erro ao salvar no banco." })
    }
})

bagreRoutes.get('/schedules', async (req: Request, res: Response) => {
    try {

        const listSchedules = await Bagre.find()

        return res.status(200).json(listSchedules)
    } catch (error) {
        return res.status(404).json({error: "Lista de agendamentos não encontrada."})
    }
})