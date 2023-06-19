/*
  Warnings:

  - You are about to drop the column `idUser` on the `event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_idUser_fkey`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `idUser`;

-- CreateTable
CREATE TABLE `_EventUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EventUser_AB_unique`(`A`, `B`),
    INDEX `_EventUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EventUser` ADD CONSTRAINT `_EventUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventUser` ADD CONSTRAINT `_EventUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
