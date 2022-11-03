-- CreateEnum
CREATE TYPE "TemplateType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "PaycycleGroupType" AS ENUM ('BUDGET', 'ACTUAL');

-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "identifier" VARCHAR(255) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Templates" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "description" TEXT,
    "template_type" "TemplateType" NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "budgetId" INTEGER NOT NULL,

    CONSTRAINT "Templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paycycles" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "budgetId" INTEGER NOT NULL,

    CONSTRAINT "Paycycles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaycycleSummary" (
    "id" TEXT NOT NULL,
    "budget_income" INTEGER NOT NULL DEFAULT 0,
    "budget_expenses" INTEGER NOT NULL DEFAULT 0,
    "budget_balance" INTEGER NOT NULL DEFAULT 0,
    "actual_income" INTEGER NOT NULL DEFAULT 0,
    "actual_expenses" INTEGER NOT NULL DEFAULT 0,
    "actual_balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paycycleSummaryId" TEXT NOT NULL,

    CONSTRAINT "PaycycleSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaycycleItems" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "description" TEXT,
    "group_type" "PaycycleGroupType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paycycleId" TEXT NOT NULL,
    "templatesId" TEXT NOT NULL,

    CONSTRAINT "PaycycleItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "description" TEXT,
    "isLiability" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountItems" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "description" TEXT,
    "amount" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT,

    CONSTRAINT "AccountItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Budget_identifier_key" ON "Budget"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Templates_identifier_version_key" ON "Templates"("identifier", "version");

-- CreateIndex
CREATE UNIQUE INDEX "Paycycles_identifier_key" ON "Paycycles"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "PaycycleSummary_paycycleSummaryId_key" ON "PaycycleSummary"("paycycleSummaryId");

-- CreateIndex
CREATE UNIQUE INDEX "PaycycleItems_identifier_key" ON "PaycycleItems"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Account_identifier_key" ON "Account"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "AccountItems_identifier_key" ON "AccountItems"("identifier");

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paycycles" ADD CONSTRAINT "Paycycles_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaycycleSummary" ADD CONSTRAINT "PaycycleSummary_paycycleSummaryId_fkey" FOREIGN KEY ("paycycleSummaryId") REFERENCES "Paycycles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaycycleItems" ADD CONSTRAINT "PaycycleItems_paycycleId_fkey" FOREIGN KEY ("paycycleId") REFERENCES "Paycycles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaycycleItems" ADD CONSTRAINT "PaycycleItems_templatesId_fkey" FOREIGN KEY ("templatesId") REFERENCES "Templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountItems" ADD CONSTRAINT "AccountItems_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
