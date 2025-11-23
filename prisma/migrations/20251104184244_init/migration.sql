/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Company" DROP CONSTRAINT "Company_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "publicId" TEXT NOT NULL DEFAULT 'CORP';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_type" SET DEFAULT ARRAY['Pending']::TEXT[];

-- CreateTable
CREATE TABLE "_CompanyToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CompanyToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CompanyToUser_B_index" ON "_CompanyToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Company_publicId_key" ON "Company"("publicId");

-- AddForeignKey
ALTER TABLE "_CompanyToUser" ADD CONSTRAINT "_CompanyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToUser" ADD CONSTRAINT "_CompanyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
