import {} from 'express';
import { prisma } from '../database/prisma.js'; // ajuste o caminho conforme seu projeto
import bcrypt from 'bcryptjs';
import { z } from 'zod';
export class AtletaController {
    async create(req, res) {
        const bodySchema = z.object({
            email: z.email(),
            firstName: z.string().trim().min(3, "O nome deve ter no mínimo 3 caracteres"),
            lastName: z.string().trim().min(3, "O sobrenome deve ter no mínimo 3 caracteres"),
            password: z.string().trim().min(6, "A Senha deve conter ao menos 6 caracteres"),
            confirmPassword: z.string().trim().min(6)
        });
        try {
            const { firstName, lastName, email, password, confirmPassword } = bodySchema.parse(req.body);
            // 1. Verificar se o e-mail já existe
            const userExists = await prisma.atletas.findUnique({ where: { email } });
            if (userExists) {
                return res.status(400).json({ error: "Este e-mail já está cadastrado." });
            }
            if (password !== confirmPassword) {
                return res.status(400).json({ error: "Senhas diferentes." });
            }
            // 2. Criptografar a senha
            // O "10" é o 'salt' (nível de complexidade da criptografia)
            const hashedPassword = await bcrypt.hash(password, 10);
            // 3. Criar o atleta no banco
            const atleta = await prisma.atletas.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword, // Salva a versão protegida
                },
            });
            // 4. Retornar sem a senha por segurança
            return res.status(201).json({
                id: atleta.id,
                name: `${atleta.firstName} ${atleta.lastName}`,
                email: atleta.email,
            });
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao cadastrar atleta." });
        }
    }
}
//# sourceMappingURL=newAtletaController.js.map