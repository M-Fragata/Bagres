import {} from "express";
import { configSchema } from "../schemas/configSchema.js";
import { prisma } from "../database/prisma.js";
import { z } from "zod";
export class ConfigController {
    async create(req, res) {
        const data = configSchema.parse(req.body);
        if (!data) {
            return res.json({ error: "Dados não recebidos." });
        }
        try {
            const configData = await prisma.config.upsert({
                where: { id: 1 },
                update: {
                    dias: data.dias,
                    horarios: data.horarios
                },
                create: {
                    id: 1,
                    dias: data.dias,
                    horarios: data.horarios
                }
            });
            return res.status(200).json(configData);
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                const zodError = error;
                return res.status(400).json({
                    message: "Dados inválidos",
                    errors: zodError.flatten().fieldErrors
                });
            }
            console.error("Falha ao salvar configuração:", error);
            return res.status(500).json({ error: "Falha interna ao salvar configuração" });
        }
    }
    async index(req, res) {
        try {
            const data = await prisma.config.findUnique({
                where: { id: 1 }
            });
            return res.status(200).json(data);
        }
        catch (error) {
            return res.status(400).json({ error: "Erro ao encontrar dados" });
        }
    }
}
//# sourceMappingURL=configController.js.map