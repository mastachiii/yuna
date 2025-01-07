/*
  Warnings:

  - You are about to drop the column `expiraionDate` on the `Link` table. All the data in the column will be lost.
  - Added the required column `expirationDate` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "expiraionDate",
ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fileId" TEXT,
ADD COLUMN     "folderId" TEXT;
