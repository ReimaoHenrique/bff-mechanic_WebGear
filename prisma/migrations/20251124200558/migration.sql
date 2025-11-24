/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Company` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Company_name_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "createdBy";
