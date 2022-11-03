/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccountItems" DROP CONSTRAINT "AccountItems_accountId_fkey";

-- DropTable
DROP TABLE "Account";

-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "description" TEXT,
    "isLiability" BOOLEAN NOT NULL DEFAULT false,
    "budgetId" INTEGER,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_identifier_key" ON "Accounts"("identifier");

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountItems" ADD CONSTRAINT "AccountItems_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
