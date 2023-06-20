/*
  Warnings:

  - You are about to drop the `appartient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `appartient` DROP FOREIGN KEY `Appartient_idEtablissement_fkey`;

-- DropForeignKey
ALTER TABLE `appartient` DROP FOREIGN KEY `Appartient_idUser_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `idEtablissement` INTEGER NULL;

-- DropTable
DROP TABLE `appartient`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_idEtablissement_fkey` FOREIGN KEY (`idEtablissement`) REFERENCES `Etablissement`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
