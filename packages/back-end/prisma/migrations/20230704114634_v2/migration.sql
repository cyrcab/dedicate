/*
  Warnings:

  - A unique constraint covering the columns `[titre]` on the table `Musique` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[artiste]` on the table `Musique` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Musique_titre_key` ON `Musique`(`titre`);

-- CreateIndex
CREATE UNIQUE INDEX `Musique_artiste_key` ON `Musique`(`artiste`);
