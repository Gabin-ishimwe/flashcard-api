/*
  Warnings:

  - You are about to drop the `flashCardCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `generalCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `generalSubCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mainFlashCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "flashCardCategory" DROP CONSTRAINT "flashCardCategory_generalSubCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "generalSubCategory" DROP CONSTRAINT "generalSubCategory_generalCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "mainFlashCard" DROP CONSTRAINT "mainFlashCard_flashCardCategoryId_fkey";

-- DropTable
DROP TABLE "flashCardCategory";

-- DropTable
DROP TABLE "generalCategory";

-- DropTable
DROP TABLE "generalSubCategory";

-- DropTable
DROP TABLE "mainFlashCard";

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "subCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flashCard" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subCategoryId" INTEGER NOT NULL,

    CONSTRAINT "flashCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "subCategory_name_key" ON "subCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "flashCard_title_key" ON "flashCard"("title");

-- AddForeignKey
ALTER TABLE "subCategory" ADD CONSTRAINT "subCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flashCard" ADD CONSTRAINT "flashCard_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "subCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
