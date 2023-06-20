/*
  Warnings:

  - You are about to drop the column `lieu` on the `etablissement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refRole]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tel]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tel` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appartient` MODIFY `refPoste` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `etablissement` DROP COLUMN `lieu`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `tel` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Role_refRole_key` ON `Role`(`refRole`);

-- CreateIndex
CREATE UNIQUE INDEX `User_tel_key` ON `User`(`tel`);
