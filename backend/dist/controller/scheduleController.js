import {} from "express";
import { prisma } from "../database/prisma.js";
import { scheduleSchema } from "../schemas/privateSchema.js";
import { z } from "zod";
export class SchedulesController {
    // Criar Agendamento
    async create(req, res) {
        try {
            // Valida os dados de entrada (Data, Hora, Nome)
            const data = scheduleSchema.parse(req.body);
            const schedule = await prisma.schedules.create({
                data: {
                    atleta: data.name,
                    date: data.date,
                    hour: data.hour,
                },
            });
            return res.status(201).json(schedule);
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ errors: error.message });
            }
            return res.status(500).json({ error: "Erro ao criar agendamento" });
        }
    }
    // Listar todos os agendamentos
    async index(req, res) {
        try {
            const { date, name } = req.query; // Recebe a string "2026-02-05"
            const where = {};
            if (date && String(date).trim() !== "") {
                where.date = String(date);
            }
            if (name && String(name).trim() !== "") {
                where.atleta = {
                    contains: String(name),
                    mode: "insensitive"
                };
            }
            // 3. Retorno para o Frontend
            const schedules = await prisma.schedules.findMany({
                where,
                orderBy: { hour: 'asc' }
            });
            return res.json(schedules);
        }
        catch (error) {
            console.error("Erro no Controller Index:", error);
            return res.status(500).json({ error: "Erro interno ao buscar agendamentos" });
        }
    }
    // Atualizar agendamento
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = scheduleSchema.parse(req.body);
            if (typeof id !== 'string') {
                return res.status(400).json({ error: "ID inválido" });
            }
            const ScheduleUpdated = await prisma.schedules.update({
                where: { id },
                data: {
                    atleta: data.name,
                    date: data.date,
                    hour: data.hour,
                    updatedAt: new Date(),
                }
            });
            return res.json(ScheduleUpdated);
        }
        catch (error) {
            return res.status(400).json({ error: "Erro ao atualizar agendamento" });
        }
    }
    // Deletar agendamento
    async delete(req, res) {
        try {
            const { id } = req.params;
            if (typeof id !== 'string') {
                return res.status(400).json({ error: "ID inválido" });
            }
            await prisma.schedules.delete({
                where: { id }
            });
            return res.status(204).send(); // 204 significa sucesso sem conteúdo de retorno
        }
        catch (error) {
            return res.status(400).json({ error: "Erro ao deletar agendamento" });
        }
    }
}
//# sourceMappingURL=scheduleController.js.map