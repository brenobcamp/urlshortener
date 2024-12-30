/*
  Warnings:

  - You are about to drop the column `excluded` on the `Url` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "excluded",
ADD COLUMN     "excludedAt" TIMESTAMP(3);
