CREATE TABLE `locations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(140) NOT NULL,
	`city` varchar(100) NOT NULL,
	`state` varchar(100),
	`status` enum('draft','verified','paused') NOT NULL DEFAULT 'draft',
	`notes` text,
	`verifiedAt` timestamp,
	CONSTRAINT `locations_id` PRIMARY KEY(`id`),
	CONSTRAINT `locations_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `packages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(140) NOT NULL,
	`name` varchar(160) NOT NULL,
	`description` text,
	`priceLabel` varchar(120) NOT NULL DEFAULT 'To be configured',
	`isPublished` int NOT NULL DEFAULT 0,
	CONSTRAINT `packages_id` PRIMARY KEY(`id`),
	CONSTRAINT `packages_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(160) NOT NULL,
	`title` varchar(180) NOT NULL,
	`topic` varchar(100) NOT NULL,
	`excerpt` text NOT NULL,
	`body` text,
	`isPublished` int NOT NULL DEFAULT 0,
	CONSTRAINT `resources_id` PRIMARY KEY(`id`),
	CONSTRAINT `resources_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `serviceRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicReference` varchar(32) NOT NULL,
	`urgency` enum('immediate','planned') NOT NULL,
	`services` text NOT NULL,
	`city` varchar(120) NOT NULL,
	`timing` varchar(120) NOT NULL,
	`name` varchar(160) NOT NULL,
	`phone` varchar(40) NOT NULL,
	`email` varchar(320),
	`notes` text,
	`status` enum('NEW','CONTACTED','CONFIRMED','ASSIGNED','IN_PROGRESS','COMPLETED','CANCELLED') NOT NULL DEFAULT 'NEW',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `serviceRequests_id` PRIMARY KEY(`id`),
	CONSTRAINT `serviceRequests_publicReference_unique` UNIQUE(`publicReference`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(140) NOT NULL,
	`name` varchar(160) NOT NULL,
	`category` varchar(80) NOT NULL,
	`shortDescription` text NOT NULL,
	`details` text,
	`isPublished` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`),
	CONSTRAINT `services_slug_unique` UNIQUE(`slug`)
);
