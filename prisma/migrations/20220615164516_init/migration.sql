-- CreateTable
CREATE TABLE "generalCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "generalCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generalSubCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "generalCategoryId" INTEGER NOT NULL,

    CONSTRAINT "generalSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flashCardCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "generalSubCategoryId" INTEGER NOT NULL,

    CONSTRAINT "flashCardCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mainFlashCard" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "flashCardCategoryId" INTEGER NOT NULL,

    CONSTRAINT "mainFlashCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "generalCategory_name_key" ON "generalCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "generalSubCategory_name_key" ON "generalSubCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "flashCardCategory_name_key" ON "flashCardCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "mainFlashCard_title_key" ON "mainFlashCard"("title");

-- AddForeignKey
ALTER TABLE "generalSubCategory" ADD CONSTRAINT "generalSubCategory_generalCategoryId_fkey" FOREIGN KEY ("generalCategoryId") REFERENCES "generalCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flashCardCategory" ADD CONSTRAINT "flashCardCategory_generalSubCategoryId_fkey" FOREIGN KEY ("generalSubCategoryId") REFERENCES "generalSubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mainFlashCard" ADD CONSTRAINT "mainFlashCard_flashCardCategoryId_fkey" FOREIGN KEY ("flashCardCategoryId") REFERENCES "flashCardCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
