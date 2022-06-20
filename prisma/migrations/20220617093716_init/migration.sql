/*
  Warnings:

  - You are about to drop the `flash_card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "flash_card" DROP CONSTRAINT "flash_card_subCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "sub_category" DROP CONSTRAINT "sub_category_categoryId_fkey";

-- DropTable
DROP TABLE "flash_card";

-- DropTable
DROP TABLE "sub_category";

-- CreateTable
CREATE TABLE "sub" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "sub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flash" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subCategoryId" INTEGER NOT NULL,

    CONSTRAINT "flash_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sub_name_key" ON "sub"("name");

-- CreateIndex
CREATE UNIQUE INDEX "flash_title_key" ON "flash"("title");

-- AddForeignKey
ALTER TABLE "sub" ADD CONSTRAINT "sub_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flash" ADD CONSTRAINT "flash_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "sub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
