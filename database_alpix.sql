-- phpMyAdmin SQL Dump
-- version OVH
-- https://www.phpmyadmin.net/
--
-- Hôte : alpixphojrlearn.mysql.db
-- Généré le : ven. 27 jan. 2023 à 11:14
-- Version du serveur : 5.7.41-log
-- Version de PHP : 7.4.29

-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- START TRANSACTION;
-- SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `alpixphojrlearn`
--
CREATE DATABASE IF NOT EXISTS `alpixphojrlearn` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `alpixphojrlearn`;

-- --------------------------------------------------------

--
-- Structure de la table `contents_them`
--

DROP TABLE IF EXISTS `contents_them`;
CREATE TABLE IF NOT EXISTS `contents_them` (
  `content_them_id` int(11) NOT NULL AUTO_INCREMENT,
  `content_them` varchar(250) NOT NULL,
  `notion_id` int(11) NOT NULL,
  PRIMARY KEY (`content_them_id`),
  KEY `notion_id_fk_ct` (`notion_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `evaluations`
--

DROP TABLE IF EXISTS `evaluations`;
CREATE TABLE IF NOT EXISTS `evaluations` (
  `evaluation_id` int(11) NOT NULL AUTO_INCREMENT,
  `evaluation` varchar(20) NOT NULL,
  `exercice_id` int(11) NOT NULL,
  PRIMARY KEY (`evaluation_id`),
  UNIQUE KEY `exercice_id` (`exercice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `exercices`
--

DROP TABLE IF EXISTS `exercices`;
CREATE TABLE IF NOT EXISTS `exercices` (
  `exercice_id` int(11) NOT NULL AUTO_INCREMENT,
  `exercice` text NOT NULL,
  `content_them_id` int(11) NOT NULL,
  PRIMARY KEY (`exercice_id`),
  UNIQUE KEY `content_them_id` (`content_them_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `explications_contents`
--

DROP TABLE IF EXISTS `explications_contents`;
CREATE TABLE IF NOT EXISTS `explications_contents` (
  `explication_content_id` int(11) NOT NULL AUTO_INCREMENT,
  `explication_content` text NOT NULL,
  `program_content_id` int(11) NOT NULL,
  PRIMARY KEY (`explication_content_id`),
  KEY `program_content_id_fk_ec` (`program_content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `goals`
--

DROP TABLE IF EXISTS `goals`;
CREATE TABLE IF NOT EXISTS `goals` (
  `goal_id` int(11) NOT NULL AUTO_INCREMENT,
  `goal` text NOT NULL,
  `session_id` int(11) NOT NULL,
  PRIMARY KEY (`goal_id`),
  KEY `session_id_fk_g` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `notions`
--

DROP TABLE IF EXISTS `notions`;
CREATE TABLE IF NOT EXISTS `notions` (
  `notion_id` int(11) NOT NULL AUTO_INCREMENT,
  `notion` varchar(250) NOT NULL,
  `session_id` int(11) NOT NULL,
  `goal_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`notion_id`),
  KEY `session_id_fk_n` (`session_id`),
  KEY `goal_id_fk_n` (`goal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `observations`
--

DROP TABLE IF EXISTS `observations`;
CREATE TABLE IF NOT EXISTS `observations` (
  `observation_id` int(11) NOT NULL AUTO_INCREMENT,
  `observation` text NOT NULL,
  `evaluation_id` int(11) NOT NULL,
  PRIMARY KEY (`observation_id`),
  UNIQUE KEY `evaluation_id` (`evaluation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `programs`
--

DROP TABLE IF EXISTS `programs`;
CREATE TABLE IF NOT EXISTS `programs` (
  `program_id` int(11) NOT NULL AUTO_INCREMENT,
  `program_title` varchar(250) NOT NULL,
  `program_type` varchar(250) NOT NULL,
  `program_version` varchar(250) DEFAULT NULL,
  `program_description` text NOT NULL,
  `program_desc_plus` text,
  `program_price` varchar(250) NOT NULL,
  `program_cost_folder` text,
  `program_duration` varchar(250) NOT NULL,
  `program_date` varchar(250) NOT NULL,
  `program_module` varchar(250) DEFAULT NULL,
  `program_public` varchar(250) NOT NULL,
  `program_condition` text,
  `program_more_cond` text,
  `program_grid_name` varchar(250) NOT NULL,
  `program_niveau` varchar(150) NOT NULL,
  `program_grid_type` varchar(150) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`program_id`),
  KEY `user_id_fk_u` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `program_contents`
--

DROP TABLE IF EXISTS `program_contents`;
CREATE TABLE IF NOT EXISTS `program_contents` (
  `program_content_id` int(11) NOT NULL AUTO_INCREMENT,
  `program_content` varchar(250) NOT NULL,
  `program_id` int(11) NOT NULL,
  PRIMARY KEY (`program_content_id`),
  KEY `program_id_fk_pc` (`program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `program_pedagogies`
--

DROP TABLE IF EXISTS `program_pedagogies`;
CREATE TABLE IF NOT EXISTS `program_pedagogies` (
  `program_pedagogy_id` int(11) NOT NULL AUTO_INCREMENT,
  `program_pedagogy` text NOT NULL,
  `program_id` int(11) NOT NULL,
  PRIMARY KEY (`program_pedagogy_id`),
  KEY `program_id_fk_pp` (`program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` int(11) NOT NULL AUTO_INCREMENT,
  `session` varchar(150) NOT NULL,
  `program_id` int(11) NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `program_id_fk_s` (`program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_mail` varchar(250) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `contents_them`
--
ALTER TABLE `contents_them`
  ADD CONSTRAINT `notion_id_fk_ct` FOREIGN KEY (`notion_id`) REFERENCES `notions` (`notion_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `evaluations`
--
ALTER TABLE `evaluations`
  ADD CONSTRAINT `exercice_id_fk_e` FOREIGN KEY (`exercice_id`) REFERENCES `exercices` (`exercice_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `exercices`
--
ALTER TABLE `exercices`
  ADD CONSTRAINT `content_them_id_fk_e` FOREIGN KEY (`content_them_id`) REFERENCES `contents_them` (`content_them_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `explications_contents`
--
ALTER TABLE `explications_contents`
  ADD CONSTRAINT `program_content_id_fk_ec` FOREIGN KEY (`program_content_id`) REFERENCES `program_contents` (`program_content_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `goals`
--
ALTER TABLE `goals`
  ADD CONSTRAINT `session_id_fk_g` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`session_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `notions`
--
ALTER TABLE `notions`
  ADD CONSTRAINT `goal_id_fk_n` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`goal_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `session_id_fk_n` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`session_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `observations`
--
ALTER TABLE `observations`
  ADD CONSTRAINT `evaluation_id_fk_o` FOREIGN KEY (`evaluation_id`) REFERENCES `evaluations` (`evaluation_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `programs`
--
ALTER TABLE `programs`
  ADD CONSTRAINT `user_id_fk_u` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `program_contents`
--
ALTER TABLE `program_contents`
  ADD CONSTRAINT `program_id_fk_pc` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `program_pedagogies`
--
ALTER TABLE `program_pedagogies`
  ADD CONSTRAINT `program_id_fk_pp` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `program_id_fk_s` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
