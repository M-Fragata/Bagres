import { type Request, type Response } from 'express';
import { z, ZodError } from "zod";
import { prisma } from '../database/prisma.js';
import bcrypt from 'bcryptjs';
import { message } from 'telegraf/filters';

export class ForgotPasswordController {
    async forgotPassword(req: Request, res: Response) {

        const bodySchema = z.object({
            email: z.email(),
            password: z.string().min(6,"Senha deve conter no mínimo 6 characteres").optional(),
            confirmPassword: z.string().optional()
        })

        try {
            
            const { email, password, confirmPassword } = bodySchema.parse(req.body);

            const user = await prisma.atletas.findUnique({
                where: {email}
            })

            if(!user) {
                console.log(email)
                return res.status(404).json({ message: "Atleta não encontrado" });
            }

            if(!password) {

                return res.status(200).json({ message: "E-mail de recuperação enviado" });
            }

            if(password !== confirmPassword){
                return res.status(400).json({
                    message: "Senhas diferentes"
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await prisma.atletas.update({
                data: {
                    password: hashedPassword
                },
                where: {email}
            })

            return res.status(200).json({
                message: "Senha alterada com sucesso!"
            })


        } catch (error) {

            if(error instanceof ZodError) {
                return res.status(400).json({ message: "Dados inválidos"});
            }

            return res.status(500).json({ message: "Erro interno do servidor" });

        }


    }
}