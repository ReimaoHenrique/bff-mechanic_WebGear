import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserById = async (id: string) => {
  if (!id) throw new Error("ID inválido.");
  return prisma.user.findUnique({ where: { id: Number(id) } });
};
