-- DropIndex
DROP INDEX `Diffuser_idEvent_fkey` ON `diffuser`;

-- DropIndex
DROP INDEX `Enchere_idEvent_fkey` ON `enchere`;

-- DropIndex
DROP INDEX `Enchere_idMusique_fkey` ON `enchere`;

-- DropIndex
DROP INDEX `Enchere_idUser_fkey` ON `enchere`;

-- DropIndex
DROP INDEX `Event_idEtablissement_fkey` ON `event`;

-- DropIndex
DROP INDEX `User_idEtablissement_fkey` ON `user`;

-- DropIndex
DROP INDEX `User_roleId_fkey` ON `user`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_idEtablissement_fkey` FOREIGN KEY (`idEtablissement`) REFERENCES `Etablissement`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diffuser` ADD CONSTRAINT `Diffuser_idMusique_fkey` FOREIGN KEY (`idMusique`) REFERENCES `Musique`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diffuser` ADD CONSTRAINT `Diffuser_idEvent_fkey` FOREIGN KEY (`idEvent`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_idEtablissement_fkey` FOREIGN KEY (`idEtablissement`) REFERENCES `Etablissement`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enchere` ADD CONSTRAINT `Enchere_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enchere` ADD CONSTRAINT `Enchere_idMusique_fkey` FOREIGN KEY (`idMusique`) REFERENCES `Musique`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enchere` ADD CONSTRAINT `Enchere_idEvent_fkey` FOREIGN KEY (`idEvent`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventUser` ADD CONSTRAINT `_EventUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventUser` ADD CONSTRAINT `_EventUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
