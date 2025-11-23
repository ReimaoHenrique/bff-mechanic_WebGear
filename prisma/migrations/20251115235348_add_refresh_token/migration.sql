/*
  Warnings:

  - You are about to drop the `_CompanyToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Em_Andamento', 'Concluido', 'Cancelado', 'Aguardando_Pecas', 'Aguardando_Aprovacao');

-- DropForeignKey
ALTER TABLE "public"."_CompanyToUser" DROP CONSTRAINT "_CompanyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CompanyToUser" DROP CONSTRAINT "_CompanyToUser_B_fkey";

-- DropTable
DROP TABLE "public"."_CompanyToUser";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'Em_Andamento',
    "fotos_antes" TEXT[],
    "fotos_depois" TEXT[],
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor_cobrado_amount" DOUBLE PRECISION NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "oficina_id" TEXT NOT NULL,
    "colaborador_id" INTEGER NOT NULL,
    "pecas_usadas" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_token_idx" ON "RefreshToken"("token");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_colaborador_id_fkey" FOREIGN KEY ("colaborador_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_oficina_id_fkey" FOREIGN KEY ("oficina_id") REFERENCES "Company"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
