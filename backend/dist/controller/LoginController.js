import {} from 'express';
import { prisma } from '../database/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export class LoginController {
    async create(req, res) {
        try {
            const { email, password } = req.body;
            // 1. Buscar o atleta pelo email
            const atleta = await prisma.atletas.findUnique({
                where: { email },
            });
            if (!atleta) {
                return res.status(401).json({ error: "E-mail ou senha inválidos." });
            }
            // 2. Comparar a senha digitada com a criptografada do banco
            const passwordMatch = await bcrypt.compare(password, atleta.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: "E-mail ou senha inválidos." });
            }
            // 3. Gerar o Token JWT
            // O primeiro parâmetro é o que queremos "esconder" no token (o ID do atleta)
            // O segundo é uma frase secreta que só o seu servidor conhece
            const token = jwt.sign({ id: atleta.id }, process.env.JWT_SECRET, {
                expiresIn: '7d', // O usuário fica logado por 7 dias
            });
            // 4. Retornar os dados do atleta e o token
            return res.json({
                atleta: {
                    id: atleta.id,
                    name: `${atleta.firstName} ${atleta.lastName}`,
                    email: atleta.email,
                    role: atleta.role,
                },
                token,
            });
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao realizar login." });
        }
    }
    async index(req, res) {
        try {
            const id = req.userId;
            const atletaData = await prisma.atletas.findUnique({
                where: { id },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    role: true,
                }
            });
            if (!atletaData) {
                return res.status(404).json({ error: "Atleta não encontrado." });
            }
            return res.json(atletaData);
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao buscar atleta." });
        }
    }
}
//# sourceMappingURL=LoginController.js.map