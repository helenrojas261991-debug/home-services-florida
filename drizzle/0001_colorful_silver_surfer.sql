CREATE TABLE `contactSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`message` text NOT NULL,
	`subject` varchar(255),
	`status` enum('new','read','responded') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contactSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(128) NOT NULL,
	`titleEn` text,
	`titleEs` text,
	`descriptionEn` text,
	`descriptionEs` text,
	`imageUrl` text,
	`videoUrl` text,
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_id` PRIMARY KEY(`id`),
	CONSTRAINT `content_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `googleReviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`googleReviewId` varchar(128) NOT NULL,
	`authorName` varchar(255) NOT NULL,
	`rating` decimal(2,1) NOT NULL,
	`reviewText` text,
	`reviewTime` timestamp,
	`authorPhotoUrl` text,
	`isVerifiedBuyer` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `googleReviews_id` PRIMARY KEY(`id`),
	CONSTRAINT `googleReviews_googleReviewId_unique` UNIQUE(`googleReviewId`)
);
--> statement-breakpoint
CREATE TABLE `instagramPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`instagramId` varchar(128) NOT NULL,
	`caption` text,
	`mediaType` varchar(50) NOT NULL,
	`mediaUrl` text NOT NULL,
	`permalink` text,
	`timestamp` timestamp,
	`likeCount` int DEFAULT 0,
	`commentCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `instagramPosts_id` PRIMARY KEY(`id`),
	CONSTRAINT `instagramPosts_instagramId_unique` UNIQUE(`instagramId`)
);
--> statement-breakpoint
CREATE TABLE `integrationSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`service` varchar(50) NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`businessId` varchar(128),
	`instagramBusinessAccountId` varchar(128),
	`lastSyncedAt` timestamp,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `integrationSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `integrationSettings_service_unique` UNIQUE(`service`)
);
