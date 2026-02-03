import { type Request, type Response } from 'express';
import { prisma } from '../database/prisma.js'; // ajuste o caminho conforme seu projeto
import bcrypt from 'bcryptjs';

export class AtletaController {
  async create(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password } = req.body;

      // 1. Verificar se o e-mail já existe
      const userExists = await prisma.atletas.findUnique({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: "Este e-mail já está cadastrado." });
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

    } catch (error) {
      return res.status(500).json({ error: "Erro ao cadastrar atleta." });
    }
  }
}