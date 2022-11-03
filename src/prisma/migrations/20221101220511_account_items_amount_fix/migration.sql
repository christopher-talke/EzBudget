/*
  Warnings:

  - The `amount` column on the `AccountItems` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AccountItems" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0;
