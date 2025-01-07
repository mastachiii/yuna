/*
  Warnings:

  - You are about to drop the column `age` on the `Link` table. All the data in the column will be lost.
  - Added the required column `expiraionDate` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "age",
ADD COLUMN     "expiraionDate" TIMESTAMP(3) NOT NULL;
