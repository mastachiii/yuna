/*
  Warnings:

  - You are about to drop the column `fileId` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `folderId` on the `Link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_fileId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_folderId_fkey";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "fileId",
DROP COLUMN "folderId";
