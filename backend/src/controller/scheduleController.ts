import { type Request, type Response } from "express"
import { prisma } from "../database/prisma.js"
import { scheduleSchema } from "../schemas/privateSchema.js"
import { z } from "zod"
import { sendTelegramMessage } from "../services/telegramService.js"

export class SchedulesController {

    // Criar Agendamento
    async create(req: Request, res: Response) {
        try {
            // O ZOD CONTINUA AQUI: Se falhar, ele pula para o catch
            const data = scheduleSchema.parse(req.body);


            //Regra #1 validação de data passada

            const now = new Date()
            now.setHours(now.getHours() - 3)

            const [year, month, day] = data.date.split("-").map(Number)
            const [hour, minute] = data.hour.split(":").map(Number)

            const scheduleDateTime = new Date(year!, month! - 1, day, hour, minute)

            if (scheduleDateTime < now) {
                return res.status(400).json({ error: "Não é possível agendar em uma data ou horário que já passou." })
            }

            //Regra #2 Limite de 4 Agendamentos por Horário

            const countSchedules = await prisma.schedules.count({
                where: {
                    date: data.date,
                    hour: data.hour
                }
            })

            if (countSchedules >= 4) {
                return res.status(400).json({ error: "Este horário já atingiu o limite máximo de 4 atletas." })
            }

            // O PRISMA SALVA: Usando os dados que o Zod validou
            const schedule = await prisma.schedules.create({
                data: {
                    atleta: data.name,
                    date: data.date,
                    hour: data.hour,
                },
            });

            const formattedDate = new Date(schedule.date.replaceAll("-", "/")).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            })


            // O TELEGRAM ENVIA: O que o banco confirmou
            const msg = `<b>🏊‍♂️ Novo Agendamento!</b>\n\n` +
                `<b>Atleta:</b> ${schedule.atleta}\n` +
                `<b>Data:</b> ${formattedDate}\n` +
                `<b>Hora:</b> ${schedule.hour}`;

            await sendTelegramMessage(msg);

            return res.status(201).json(schedule);

        } catch (error) {
            // Se o Zod barrar, o erro cai aqui com a mensagem que você definiu no schema
            if (error instanceof z.ZodError) {
                return res.status(400).json({ errors: error.flatten() });
            }
            return res.status(500).json({ error: "Erro ao criar agendamento" });
        }
    }

    // Listar todos os agendamentos
    async index(req: Request, res: Response) {
        try {
            const { date, name } = req.query; // Recebe a string "2026-02-05"

            const where: any = {}

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
                orderBy: [
                    { date: 'desc' }, 
                    { hour: 'asc' } 
                ]
            });

            return res.json(schedules);

        } catch (error) {
            console.error("Erro no Controller Index:", error);
            return res.status(500).json({ error: "Erro interno ao buscar agendamentos" });
        }
    }

    // Atualizar agendamento
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const data = scheduleSchema.parse(req.body)

            if (typeof id !== 'string') {
                return res.status(400).json({ error: "ID inválido" })
            }

            const ScheduleUpdated = await prisma.schedules.update({
                where: { id },
                data: {
                    atleta: data.name,
                    date: data.date,
                    hour: data.hour,
                    updatedAt: new Date(),
                }
            })

            return res.json(ScheduleUpdated)
        } catch (error) {
            return res.status(400).json({ error: "Erro ao atualizar agendamento" })
        }
    }

    // Deletar agendamento
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (typeof id !== 'string') {
                return res.status(400).json({ error: "ID inválido" })
            }

            const dataDeleted = await prisma.schedules.findUnique({ where: { id } })

            await prisma.schedules.delete({
                where: { id }
            })

            const formattedDate = new Date(`${dataDeleted?.date}`.replaceAll("-", "/")).toLocaleDateString('pt-br', {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            })

            const msg = `<b>❌ Agendamento Cancelado! </b>\n\n` +
                `<b>Atleta:</b> ${dataDeleted?.atleta}\n` +
                `<b>Data:</b> ${formattedDate}\n` +
                `<b>Hora:</b> ${dataDeleted?.hour}`;

            await sendTelegramMessage(msg)

            return res.status(204).send() // 204 significa sucesso sem conteúdo de retorno
        } catch (error) {
            return res.status(400).json({ error: "Erro ao deletar agendamento" })
        }
    }

}