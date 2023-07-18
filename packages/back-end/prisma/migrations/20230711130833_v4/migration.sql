-- AlterTable
ALTER TABLE `event` ADD COLUMN `qrCode` VARCHAR(1800) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `lastScannedEventId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_lastScannedEventId_fkey` FOREIGN KEY (`lastScannedEventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
