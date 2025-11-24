import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserById = async (id: string) => {
  if (!id) throw new Error("ID inválido.");
  return prisma.user.findUnique({ where: { id: Number(id) } });
};

interface UserUpdateData {
  picture?: string;
  name?: string;
}

export const updateUserProfile = async (id: number, data: UserUpdateData) => {
  if (!Object.keys(data).length) {
    throw new Error("Nenhum dado para atualizar.");
  }

  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      picture: true,
    },
  });
};
