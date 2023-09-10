/*
  Warnings:

  - You are about to drop the column `cvv` on the `paymentmethod` table. All the data in the column will be lost.
  - You are about to drop the column `eventActif` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `paymentmethod` DROP COLUMN `cvv`,
    ADD COLUMN `isDefault` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `eventActif`;
