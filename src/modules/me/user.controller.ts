import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUserById } from './user.service';

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export const getProfile = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ message: "Token não enviado" });
    }

    // Pega só o token
    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env['JWT_REFRESH_SECRET'] as string
    ) as TokenPayload;

    const user = await getUserById(String(decoded.id));

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // pronto, desgraça
    return res.json(user);
  } catch (error: any) {
    return res.status(401).json({
      message: "Token inválido",
      error: error.message
    });
  }
};
