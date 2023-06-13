-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refRole` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `dateN` DATETIME(3) NULL,
    `photo` VARCHAR(191) NULL,
    `typePaiement` VARCHAR(191) NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `User_mail_key`(`mail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appartient` (
    `idUser` INTEGER NOT NULL,
    `idEtablissement` INTEGER NOT NULL,
    `refPoste` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idUser`, `idEtablissement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etablissement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lieu` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diffuser` (
    `idMusique` INTEGER NOT NULL,
    `idEvent` INTEGER NOT NULL,
    `slot` INTEGER NOT NULL,

    PRIMARY KEY (`idMusique`, `idEvent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Musique` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(191) NOT NULL,
    `artiste` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `lieu` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `prix` DOUBLE NOT NULL,
    `nbSlots` INTEGER NOT NULL,
    `idUser` INTEGER NULL,
    `idEtablissement` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enchere` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prix` DOUBLE NOT NULL,
    `idUser` INTEGER NOT NULL,
    `idMusique` INTEGER NOT NULL,
    `idEvent` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appartient` ADD CONSTRAINT `Appartient_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appartient` ADD CONSTRAINT `Appartient_idEtablissement_fkey` FOREIGN KEY (`idEtablissement`) REFERENCES `Etablissement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diffuser` ADD CONSTRAINT `Diffuser_idMusique_fkey` FOREIGN KEY (`idMusique`) REFERENCES `Musique`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diffuser` ADD CONSTRAINT `Diffuser_idEvent_fkey` FOREIGN KEY (`idEvent`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_idEtablissement_fkey` FOREIGN KEY (`idEtablissement`) REFERENCES `Etablissement`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enchere` ADD CONSTRAINT `Enchere_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enchere` ADD CONSTRAINT `Enchere_idMusique_fkey` FOREIGN KEY (`idMusique`) REFERENCES `Musique`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enchere` ADD CONSTRAINT `Enchere_idEvent_fkey` FOREIGN KEY (`idEvent`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
