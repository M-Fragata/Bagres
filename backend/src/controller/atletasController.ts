import { type Request, type Response } from 'express';
import { prisma } from '../database/prisma.js';
import { atletaSchema } from "../schemas/atletaSchema.js"
import { z } from "zod"

export class AtletasController {

    async index(req: Request, res: Response) {
        try {

            const getAtletas = await prisma.atletas.findMany()

            if (!getAtletas) {
                return res.status(400).json({ error: "Nenhum atleta cadastrado" })
            }

            return res.status(200).json(getAtletas)

        } catch (error) {

            return res.status(400).json({ error: "Não foi possível listar os atletas" })

        }

    }

    async update(req: Request, res: Response) {

        try {

            const { id } = req.params
            const data = atletaSchema.parse(req.body)



            if (!id || typeof id !== "string") {
                return res.status(400).json({ error: "ID inválido" })
            }

            const atletaEdited = await prisma.atletas.update({
                where: { id },
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    role: data.role
                }
            })

            return res.json(atletaEdited)
        } catch (error) {
            // Trata erros específicos do Zod (ex: email mal formatado)
            if (error instanceof z.ZodError) {
                const zodError = error as z.ZodError;
                return res.status(400).json({
                    message: "Dados inválidos",
                    errors: zodError.flatten().fieldErrors
                });
            }

            console.error(error);
            return res.status(500).json({ error: "Erro interno ao atualizar atleta" });
        }
    }

    async delete(req: Request, res: Response) {

        try {
            const { id } = req.params

            if (!id || typeof id !== "string") {
                return res.status(400).json({ error: "ID inválido" })
            }

            await prisma.atletas.delete({
                where: { id }
            })

            return res.status(204).send();

        } catch (error: any) {
            // Erro P2025 é o código do Prisma para "Registro não encontrado"
            if (error.code === 'P2025') {
                return res.status(404).json({ error: "Atleta não encontrado" });
            }

            console.error("Erro ao deletar:", error);
            return res.status(500).json({ error: "Erro interno ao deletar atleta" });
        }

    }
}