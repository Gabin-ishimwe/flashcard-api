/*
  Warnings:

  - You are about to drop the column `createAt` on the `flashCardCategory` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `generalCategory` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `generalSubCategory` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `mainFlashCard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flashCardCategory" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "generalCategory" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "generalSubCategory" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "mainFlashCard" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
