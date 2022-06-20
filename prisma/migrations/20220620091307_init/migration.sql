/*
  Warnings:

  - You are about to drop the column `author` on the `flashCard` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `flashCard` table. All the data in the column will be lost.
  - Added the required column `answer` to the `flashCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `flashCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `flashCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `subCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flashCard" DROP COLUMN "author",
DROP COLUMN "content",
ADD COLUMN     "answer" VARCHAR(255) NOT NULL,
ADD COLUMN     "question" VARCHAR(255) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "subCategory" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "subCategory" ADD CONSTRAINT "subCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flashCard" ADD CONSTRAINT "flashCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
