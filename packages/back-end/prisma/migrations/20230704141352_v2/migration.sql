/*
  Warnings:

  - You are about to drop the column `count` on the `musique` table. All the data in the column will be lost.
  - Added the required column `countDiffuse` to the `Musique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countVote` to the `Musique` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `qrCode` VARCHAR(191) NULL;


