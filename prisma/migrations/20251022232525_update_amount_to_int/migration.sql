/*
  Warnings:

  - You are about to alter the column `amount` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `amount` on the `transactionday` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `transaction` MODIFY `amount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transactionday` MODIFY `amount` INTEGER NOT NULL;
