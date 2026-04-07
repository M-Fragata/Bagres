import { type Request, type Response } from 'express';
import { z, ZodError } from "zod";
import { prisma } from '../database/prisma.js';

export class ForgotPasswordController {
    async forgotPassword(req: Request, res: Response) {

        const bodySchema = z.object({
            emailData: z.email()
        })

        try {
            
            const { emailData: email } = bodySchema.parse(req.body);

            const user = await prisma.atletas.findUnique({
                where: {email}
            })

            if(!user) {
                return res.status(404).json({ message: "Atleta não encontrado" });
            }

            return res.status(200).json({ message: "E-mail de recuperação enviado" });


        } catch (error) {

            if(error instanceof ZodError) {
                return res.status(400).json({ message: "Dados inválidos"});
            }

            return res.status(500).json({ message: "Erro interno do servidor" });

        }


    }
}