import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']

    if(!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido.' })
    }

    const [, token] = authHeader.split(' ')


try {
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as unknown as TokenPayload;
    const { id } = decoded

    // Injeta o ID do usuário dentro da requisição para o controller usar
    req.userId = id; 

    return next();
    
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }

}

