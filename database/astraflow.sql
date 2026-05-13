-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 14 mai 2026 à 01:20
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `astraflow`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` binary(16) NOT NULL,
  `tenant_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `tenant_id`) VALUES
(0x2bb1cd7008cb4797b1994db73cc47463, 0x5094c936566243c0adb691804e68359e);

-- --------------------------------------------------------

--
-- Structure de la table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` binary(16) NOT NULL,
  `action` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `entity` varchar(100) NOT NULL,
  `entity_id` varchar(36) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `tenant_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `brandings`
--

CREATE TABLE `brandings` (
  `id` binary(16) NOT NULL,
  `custom_css` text DEFAULT NULL,
  `logo_url` varchar(500) DEFAULT NULL,
  `primary_color` varchar(20) DEFAULT NULL,
  `secondary_color` varchar(20) DEFAULT NULL,
  `tenant_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `brandings`
--

INSERT INTO `brandings` (`id`, `custom_css`, `logo_url`, `primary_color`, `secondary_color`, `tenant_id`) VALUES
(0x396d868cbdda4c46bd671582e1465956, 'body { font-family: Arial; }', 'https://cdn.demotv.com/logo.png', '#FF5733', '#33C1FF', 0x5094c936566243c0adb691804e68359e);

-- --------------------------------------------------------

--
-- Structure de la table `channels`
--

CREATE TABLE `channels` (
  `id` binary(16) NOT NULL,
  `channel_number` int(11) DEFAULT NULL,
  `logo_url` varchar(500) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('ACTIVE','INACTIVE','MAINTENANCE') NOT NULL,
  `stream_url` varchar(500) DEFAULT NULL,
  `category_id` binary(16) DEFAULT NULL,
  `tenant_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `channels`
--

INSERT INTO `channels` (`id`, `channel_number`, `logo_url`, `name`, `status`, `stream_url`, `category_id`, `tenant_id`) VALUES
(0x56daa783d3624fc180cd7d538f492ae4, 101, 'https://cdn.demotv.com/espn.png', 'ESPN HD', 'ACTIVE', 'https://stream.demotv.com/espn', 0xc97acf211e604fcbb1289efc0e0aea8e, 0x5094c936566243c0adb691804e68359e);

-- --------------------------------------------------------

--
-- Structure de la table `channel_categories`
--

CREATE TABLE `channel_categories` (
  `id` binary(16) NOT NULL,
  `description` text DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `sort_order` int(11) NOT NULL,
  `tenant_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `channel_categories`
--

INSERT INTO `channel_categories` (`id`, `description`, `name`, `sort_order`, `tenant_id`) VALUES
(0xc97acf211e604fcbb1289efc0e0aea8e, 'All sports channels', 'Sports', 1, 0x5094c936566243c0adb691804e68359e);

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `id` binary(16) NOT NULL,
  `tenant_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id`, `tenant_id`) VALUES
(0x96a567a160e44e18ab2db1eed136a776, 0x5094c936566243c0adb691804e68359e);

-- --------------------------------------------------------

--
-- Structure de la table `devices`
--

CREATE TABLE `devices` (
  `id` binary(16) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `device_id` varchar(255) NOT NULL,
  `device_name` varchar(100) NOT NULL,
  `device_type` enum('ANDROID_BOX','DESKTOP','FIRESTICK','MOBILE','OTHER','SMART_TV','TABLET') NOT NULL,
  `last_active_at` datetime(6) DEFAULT NULL,
  `client_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `devices`
--

INSERT INTO `devices` (`id`, `created_at`, `device_id`, `device_name`, `device_type`, `last_active_at`, `client_id`) VALUES
(0xed00803925894c828835ed85ff5691c0, '2026-05-13 16:17:05.000000', 'DEVICE-ABC-12345', 'Samsung TV', 'SMART_TV', NULL, 0x96a567a160e44e18ab2db1eed136a776);

-- --------------------------------------------------------

--
-- Structure de la table `favorites`
--

CREATE TABLE `favorites` (
  `id` binary(16) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `channel_id` binary(16) NOT NULL,
  `client_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `favorites`
--

INSERT INTO `favorites` (`id`, `created_at`, `channel_id`, `client_id`) VALUES
(0xc7420e9f4a7b4a3f91a92e2da03637bf, '2026-05-13 16:18:13.000000', 0x56daa783d3624fc180cd7d538f492ae4, 0x96a567a160e44e18ab2db1eed136a776);

-- --------------------------------------------------------

--
-- Structure de la table `owners`
--

CREATE TABLE `owners` (
  `company_name` varchar(255) DEFAULT NULL,
  `id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `owners`
--

INSERT INTO `owners` (`company_name`, `id`) VALUES
('AstraFlow Inc.', 0x6090615a1e4b4ad689be7ff404799c59);

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

CREATE TABLE `payments` (
  `id` binary(16) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `method` enum('BANK_TRANSFER','CREDIT_CARD','CRYPTO','DEBIT_CARD','PAYPAL','STRIPE') NOT NULL,
  `paid_at` datetime(6) DEFAULT NULL,
  `status` enum('CANCELLED','COMPLETED','FAILED','PENDING','REFUNDED') NOT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `subscription_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `payments`
--

INSERT INTO `payments` (`id`, `amount`, `currency`, `method`, `paid_at`, `status`, `transaction_id`, `subscription_id`) VALUES
(0x92db4af9eb404d05b9a4127b227100fb, 9.99, 'USD', 'CREDIT_CARD', '2026-05-13 12:00:00.000000', 'COMPLETED', 'TXN-001-2026', 0x04f1b153eea74aac922d89a6c772ab65);

-- --------------------------------------------------------

--
-- Structure de la table `plans`
--

CREATE TABLE `plans` (
  `id` binary(16) NOT NULL,
  `duration_days` int(11) NOT NULL,
  `is_active` bit(1) NOT NULL,
  `max_connections` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `plan_type` enum('CUSTOM','LIFETIME','MONTHLY','WEEKLY','YEARLY') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `tenant_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `plans`
--

INSERT INTO `plans` (`id`, `duration_days`, `is_active`, `max_connections`, `name`, `plan_type`, `price`, `tenant_id`) VALUES
(0x655fde7e693b4ee78a2d40a462c83832, 30, b'1', 2, 'Monthly Basic', 'MONTHLY', 9.99, 0x5094c936566243c0adb691804e68359e);

-- --------------------------------------------------------

--
-- Structure de la table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` binary(16) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `end_date` date NOT NULL,
  `start_date` date NOT NULL,
  `status` enum('ACTIVE','CANCELLED','EXPIRED','INACTIVE','PENDING','TRIAL') NOT NULL,
  `trial_end_date` date DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `client_id` binary(16) NOT NULL,
  `plan_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `created_at`, `end_date`, `start_date`, `status`, `trial_end_date`, `updated_at`, `client_id`, `plan_id`) VALUES
(0x04f1b153eea74aac922d89a6c772ab65, '2026-05-13 16:13:46.000000', '2026-06-13', '2026-05-13', 'ACTIVE', NULL, '2026-05-13 16:13:46.000000', 0x96a567a160e44e18ab2db1eed136a776, 0x655fde7e693b4ee78a2d40a462c83832);

-- --------------------------------------------------------

--
-- Structure de la table `support_tickets`
--

CREATE TABLE `support_tickets` (
  `id` binary(16) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `message` text NOT NULL,
  `priority` enum('HIGH','LOW','MEDIUM','URGENT') NOT NULL,
  `status` enum('CLOSED','IN_PROGRESS','OPEN','RESOLVED') NOT NULL,
  `subject` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `admin_id` binary(16) DEFAULT NULL,
  `client_id` binary(16) NOT NULL,
  `tenant_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `support_tickets`
--

INSERT INTO `support_tickets` (`id`, `created_at`, `message`, `priority`, `status`, `subject`, `updated_at`, `admin_id`, `client_id`, `tenant_id`) VALUES
(0xc84b509c7bdb4ca8afb6c4cb8f56702e, '2026-05-13 16:20:26.000000', 'ESPN HD channel keeps buffering after 10 seconds.', 'HIGH', 'OPEN', 'Stream not working', '2026-05-13 16:20:26.000000', 0x2bb1cd7008cb4797b1994db73cc47463, 0x96a567a160e44e18ab2db1eed136a776, 0x5094c936566243c0adb691804e68359e);

-- --------------------------------------------------------

--
-- Structure de la table `tenants`
--

CREATE TABLE `tenants` (
  `id` binary(16) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `custom_domain` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('ACTIVE','INACTIVE','SUSPENDED','TRIAL') NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `timezone` varchar(50) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tenants`
--

INSERT INTO `tenants` (`id`, `created_at`, `currency`, `custom_domain`, `name`, `status`, `subdomain`, `timezone`, `updated_at`) VALUES
(0x5094c936566243c0adb691804e68359e, '2026-05-13 15:57:34.000000', 'USD', 'demotv.com', 'Demo TV', 'ACTIVE', 'demotv', 'UTC', '2026-05-13 15:57:34.000000');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_type` varchar(31) NOT NULL,
  `id` binary(16) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE','PENDING_VERIFICATION','SUSPENDED') NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_type`, `id`, `created_at`, `email`, `full_name`, `password`, `phone`, `status`, `updated_at`) VALUES
('ADMIN', 0x2bb1cd7008cb4797b1994db73cc47463, '2026-05-13 16:00:22.000000', 'admin@demotv.com', 'Alice Admin', 'admin123', '+1987654321', 'ACTIVE', '2026-05-13 16:00:22.000000'),
('OWNER', 0x6090615a1e4b4ad689be7ff404799c59, '2026-05-13 15:56:11.000000', 'owner@astraflow.com', 'John Owner', 'secret123', '+1234567890', 'ACTIVE', '2026-05-13 15:56:11.000000'),
('CLIENT', 0x96a567a160e44e18ab2db1eed136a776, '2026-05-13 16:01:38.000000', 'client@example.com', 'Bob Client', 'client123', '+1555000111', 'ACTIVE', '2026-05-13 16:01:38.000000');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_admin_tenant` (`tenant_id`);

--
-- Index pour la table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_audit_tenant` (`tenant_id`),
  ADD KEY `idx_audit_user` (`user_id`),
  ADD KEY `idx_audit_entity` (`entity`,`entity_id`);

--
-- Index pour la table `brandings`
--
ALTER TABLE `brandings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKsp6n1sslm0hm9nsybn7d66tv4` (`tenant_id`);

--
-- Index pour la table `channels`
--
ALTER TABLE `channels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_channel_tenant` (`tenant_id`),
  ADD KEY `idx_channel_category` (`category_id`),
  ADD KEY `idx_channel_number` (`channel_number`);

--
-- Index pour la table `channel_categories`
--
ALTER TABLE `channel_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_channel_category_tenant` (`tenant_id`);

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_client_tenant` (`tenant_id`);

--
-- Index pour la table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_device_client` (`client_id`),
  ADD KEY `idx_device_device_id` (`device_id`);

--
-- Index pour la table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_favorite_client_channel` (`client_id`,`channel_id`),
  ADD KEY `idx_favorite_client` (`client_id`),
  ADD KEY `idx_favorite_channel` (`channel_id`);

--
-- Index pour la table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKlryndveuwa4k5qthti0pkmtlx` (`transaction_id`),
  ADD KEY `idx_payment_subscription` (`subscription_id`),
  ADD KEY `idx_payment_transaction_id` (`transaction_id`),
  ADD KEY `idx_payment_status` (`status`);

--
-- Index pour la table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_plan_tenant` (`tenant_id`);

--
-- Index pour la table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_subscription_client` (`client_id`),
  ADD KEY `idx_subscription_plan` (`plan_id`),
  ADD KEY `idx_subscription_status` (`status`);

--
-- Index pour la table `support_tickets`
--
ALTER TABLE `support_tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_ticket_tenant` (`tenant_id`),
  ADD KEY `idx_ticket_client` (`client_id`),
  ADD KEY `idx_ticket_admin` (`admin_id`),
  ADD KEY `idx_ticket_status` (`status`);

--
-- Index pour la table `tenants`
--
ALTER TABLE `tenants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKowdadmekvhjx3lk2yt24s9pyw` (`subdomain`),
  ADD KEY `idx_tenant_subdomain` (`subdomain`),
  ADD KEY `idx_tenant_custom_domain` (`custom_domain`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  ADD KEY `idx_user_email` (`email`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `FK86ry20nkepnhjogngodyq8joo` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`),
  ADD CONSTRAINT `FKanhsicqm3lc8ya77tr7r0je18` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD CONSTRAINT `FKjs4iimve3y0xssbtve5ysyef0` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKqquet9030xtkk7jyvqwuy1byu` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`);

--
-- Contraintes pour la table `brandings`
--
ALTER TABLE `brandings`
  ADD CONSTRAINT `FK1er2y0y0908hils4d56p7g7kx` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`);

--
-- Contraintes pour la table `channels`
--
ALTER TABLE `channels`
  ADD CONSTRAINT `FK8g7hnmsd1fkvf6febam0ncsn6` FOREIGN KEY (`category_id`) REFERENCES `channel_categories` (`id`),
  ADD CONSTRAINT `FKmxh2wfj79wcupjqyutkjajhu7` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`);

--
-- Contraintes pour la table `channel_categories`
--
ALTER TABLE `channel_categories`
  ADD CONSTRAINT `FKt8svki7qddho5v1uxdjevh9a3` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`);

--
-- Contraintes pour la table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `FK1hgwdp9vl25xl9i7s354sifey` FOREIGN KEY (`id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKi6fm6a7uyiods6i9witqummbf` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`);

--
-- Contraintes pour la table `devices`
--
ALTER TABLE `devices`
  ADD CONSTRAINT `FKd0i1vb74gh9q0iy0s6f64eya4` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

--
-- Contraintes pour la table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `FK3s3au8gwhn3xlsnw3fibjb63x` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `FKikx6rdt65q9lbescqn44txi7e` FOREIGN KEY (`channel_id`) REFERENCES `channels` (`id`);

--
-- Contraintes pour la table `owners`
--
ALTER TABLE `owners`
  ADD CONSTRAINT `FK76w3kxt0dkdsh0gmyralo64t4` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `FKa3xnf2o6mt8cqbewvq2ouq3rq` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions` (`id`);

--
-- Contraintes pour la table `plans`
--
ALTER TABLE `plans`
  ADD CONSTRAINT `FK2kt8cydah705qjoucvusn9hkr` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`);

--
-- Contraintes pour la table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `FKb1uf5qnxi6uj95se8ykydntl1` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`),
  ADD CONSTRAINT `FKevklhfw4ajv4e8j1cl3c8mceh` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

--
-- Contraintes pour la table `support_tickets`
--
ALTER TABLE `support_tickets`
  ADD CONSTRAINT `FK9quarmxtby8e03c66wxdec57h` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`),
  ADD CONSTRAINT `FKa14v29sbedsa1b4b9f6kbxmnh` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `FKh2rnb4posmmci514y7gm42ad3` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
