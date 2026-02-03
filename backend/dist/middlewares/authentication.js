import {} from 'express';
import jwt from 'jsonwebtoken';
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decoded;
        // Injeta o ID do usuário dentro da requisição para o controller usar
        req.userId = id;
        return next();
    }
    catch (error) {
        return res.status(401).json({ error: "Token inválido" });
    }
}
//# sourceMappingURL=authentication.js.map