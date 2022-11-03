-- CreateEnum
CREATE TYPE "PaycycleType" AS ENUM ('WEEKLY', 'BIWEEKLY', 'MONTHLY');

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "paycycle_type" "PaycycleType" NOT NULL DEFAULT 'BIWEEKLY';
