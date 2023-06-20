-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 19 juin 2023 à 17:15
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dedicate`
--

-- --------------------------------------------------------

--
-- Structure de la table `diffuser`
--

CREATE TABLE `diffuser` (
  `idMusique` int(11) NOT NULL,
  `idEvent` int(11) NOT NULL,
  `slot` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `enchere`
--

CREATE TABLE `enchere` (
  `id` int(11) NOT NULL,
  `prix` double NOT NULL,
  `idUser` int(11) NOT NULL,
  `idMusique` int(11) NOT NULL,
  `idEvent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `etablissement`
--

CREATE TABLE `etablissement` (
  `id` int(11) NOT NULL,
  `nom` varchar(191) NOT NULL,
  `adresse` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `etablissement`
--

INSERT INTO `etablissement` (`id`, `nom`, `adresse`) VALUES
(8, 'Test', 'testAdresse'),
(9, 'Test', 'testAdresse'),
(10, 'Test', 'testAdresse'),
(11, 'La Tartiflette', '3 rue des Potiers');

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `nom` varchar(191) NOT NULL,
  `lieu` varchar(191) NOT NULL,
  `date` datetime(3) NOT NULL,
  `type` varchar(191) NOT NULL,
  `prix` double NOT NULL,
  `nbSlots` int(11) NOT NULL,
  `idEtablissement` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `musique`
--

CREATE TABLE `musique` (
  `id` int(11) NOT NULL,
  `titre` varchar(191) NOT NULL,
  `artiste` varchar(191) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `refRole` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `refRole`) VALUES
(1, 'Client'),
(2, 'Gérant'),
(3, 'SuperAdmin'),
(4, 'Supprime');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nom` varchar(191) NOT NULL,
  `prenom` varchar(191) NOT NULL,
  `mail` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `dateN` datetime(3) DEFAULT NULL,
  `photo` varchar(191) DEFAULT NULL,
  `typePaiement` varchar(191) DEFAULT NULL,
  `roleId` int(11) NOT NULL,
  `tel` varchar(191) NOT NULL,
  `idEtablissement` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `nom`, `prenom`, `mail`, `password`, `dateN`, `photo`, `typePaiement`, `roleId`, `tel`, `idEtablissement`) VALUES
(4, 'Utilisateur supprimé', 'Utilisateur supprimé', 'Utilisateur supprimé', 'Utilisateur supprimé', NULL, NULL, NULL, 4, 'Utilisateur supprimé', 10),
(5, 'testupdate', 'Julien', 'test@test.com', '$2b$10$Fsqfx/Kg.jx44AjqO1nQ0eggTlJVtz2H9T/q2xlq/.p65A1acutjS', NULL, NULL, NULL, 2, '0669696969', 11),
(6, 'Armand', 'Julien', 'testUser@test.Com', '$2b$10$1h.pg1Dh86FJ4AFEt8v9.Oe/XNeTUQTDtopqOYkBdex/DqN3zC5du', NULL, NULL, NULL, 1, '0669646969', NULL),
(7, 'Ribeyron', 'Corentin', 'ribcoco@gmail.com', '$2b$10$kyKW3U9PjInVelL29nS70O6bCI1NL5kR2GMRVf0ZeZ8ToMIZsFrJe', NULL, NULL, NULL, 3, '0648365212', NULL),
(8, 'Clem', 'Clem', 'Test@testaa.com', '$2b$10$SIsT1xra3YM1qS6uky1CiOA4hTVggU0hSRC7qfjU5Bfbgf8IJphuy', NULL, NULL, NULL, 1, '0677788799', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `_eventuser`
--

CREATE TABLE `_eventuser` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('41adbdd0-0745-443f-ad81-35c6ea74fb83', 'c301a6430ff11f6b456337a347b79576808f14bd7329eaa95b7c350518ab632e', '2023-06-19 09:14:16.141', '20230619091416_v2', NULL, NULL, '2023-06-19 09:14:16.071', 1),
('5a9fbe0e-4087-4626-b737-137d3a5aba52', 'e857348f4f9e76891a4c684c44f50379ec21839533932b3edf49943d445a2607', '2023-06-13 08:13:21.679', '20230613081321_v1', NULL, NULL, '2023-06-13 08:13:21.342', 1),
('ba7af3a0-9317-4f68-8863-1edcdfe73d2c', 'b535e6346abb67e72b8430ddd3a425992e307b159df93e764ff45107b0da6bc8', '2023-06-13 14:25:16.825', '20230613142516_v2', NULL, NULL, '2023-06-13 14:25:16.756', 1),
('d5f7ce96-8f6c-4c25-8676-0d88a54c4269', 'd297fcfee5d415bbb93f3a72f6c12f7da09b4df76a4bdddeb4c0f002e3cff690', '2023-06-19 14:04:28.865', '20230619140428_v3', NULL, NULL, '2023-06-19 14:04:28.760', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `diffuser`
--
ALTER TABLE `diffuser`
  ADD PRIMARY KEY (`idMusique`,`idEvent`),
  ADD KEY `Diffuser_idEvent_fkey` (`idEvent`);

--
-- Index pour la table `enchere`
--
ALTER TABLE `enchere`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Enchere_idUser_fkey` (`idUser`),
  ADD KEY `Enchere_idMusique_fkey` (`idMusique`),
  ADD KEY `Enchere_idEvent_fkey` (`idEvent`);

--
-- Index pour la table `etablissement`
--
ALTER TABLE `etablissement`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Event_idEtablissement_fkey` (`idEtablissement`);

--
-- Index pour la table `musique`
--
ALTER TABLE `musique`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Role_refRole_key` (`refRole`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_mail_key` (`mail`),
  ADD UNIQUE KEY `User_tel_key` (`tel`),
  ADD KEY `User_roleId_fkey` (`roleId`),
  ADD KEY `User_idEtablissement_fkey` (`idEtablissement`);

--
-- Index pour la table `_eventuser`
--
ALTER TABLE `_eventuser`
  ADD UNIQUE KEY `_EventUser_AB_unique` (`A`,`B`),
  ADD KEY `_EventUser_B_index` (`B`);

--
-- Index pour la table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `enchere`
--
ALTER TABLE `enchere`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `etablissement`
--
ALTER TABLE `etablissement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `musique`
--
ALTER TABLE `musique`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `diffuser`
--
ALTER TABLE `diffuser`
  ADD CONSTRAINT `Diffuser_idEvent_fkey` FOREIGN KEY (`idEvent`) REFERENCES `event` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Diffuser_idMusique_fkey` FOREIGN KEY (`idMusique`) REFERENCES `musique` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `enchere`
--
ALTER TABLE `enchere`
  ADD CONSTRAINT `Enchere_idEvent_fkey` FOREIGN KEY (`idEvent`) REFERENCES `event` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Enchere_idMusique_fkey` FOREIGN KEY (`idMusique`) REFERENCES `musique` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Enchere_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `Event_idEtablissement_fkey` FOREIGN KEY (`idEtablissement`) REFERENCES `etablissement` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_idEtablissement_fkey` FOREIGN KEY (`idEtablissement`) REFERENCES `etablissement` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `_eventuser`
--
ALTER TABLE `_eventuser`
  ADD CONSTRAINT `_EventUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_EventUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
