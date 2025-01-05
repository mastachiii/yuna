/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Folder` table without a default value. This is not possible if the table is not empty.
  - Made the column `ownerId` on table `Folder` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_ownerId_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "date" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "date" TEXT NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_ownerId_key" ON "Folder"("ownerId");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
