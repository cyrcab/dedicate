-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refRole` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_refRole_key`(`refRole`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `dateN` DATETIME(3) NULL,
    `photo` VARCHAR(191) NULL,
    `typePaiement` VARCHAR(191) NULL,
    `roleId` INTEGER NOT NULL,
    `idEtablissement` INTEGER NULL,

    UNIQUE INDEX `User_mail_key`(`mail`),
    UNIQUE INDEX `User_tel_key`(`tel`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etablissement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `ville` VARCHAR(191) NOT NULL,
    `codePostal` VARCHAR(191) NOT NULL,

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
    `countVote` INTEGER NOT NULL,
    `countDiffuse` INTEGER NOT NULL,

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
    `photo` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `idEtablissement` INTEGER NULL,
    `qrCode` VARCHAR(1800) NULL,

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

-- CreateTable
CREATE TABLE `_EventUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EventUser_AB_unique`(`A`, `B`),
    INDEX `_EventUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
