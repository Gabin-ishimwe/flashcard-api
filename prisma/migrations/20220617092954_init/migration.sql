/*
  Warnings:

  - You are about to drop the `flashCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "flashCard" DROP CONSTRAINT "flashCard_subCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "subCategory" DROP CONSTRAINT "subCategory_categoryId_fkey";

-- DropTable
DROP TABLE "flashCard";

-- DropTable
DROP TABLE "subCategory";

-- CreateTable
CREATE TABLE "sub_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "sub_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flash_card" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subCategoryId" INTEGER NOT NULL,

    CONSTRAINT "flash_card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sub_category_name_key" ON "sub_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "flash_card_title_key" ON "flash_card"("title");

-- AddForeignKey
ALTER TABLE "sub_category" ADD CONSTRAINT "sub_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flash_card" ADD CONSTRAINT "flash_card_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "sub_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
