-- DropForeignKey
ALTER TABLE "flashCard" DROP CONSTRAINT "flashCard_subCategoryId_fkey";

-- AddForeignKey
ALTER TABLE "flashCard" ADD CONSTRAINT "flashCard_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "subCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
