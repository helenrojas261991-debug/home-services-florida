ALTER TABLE `googleReviews` MODIFY COLUMN `rating` int NOT NULL;--> statement-breakpoint
ALTER TABLE `googleReviews` ADD `comment` text;--> statement-breakpoint
ALTER TABLE `googleReviews` ADD `replyComment` text;--> statement-breakpoint
ALTER TABLE `googleReviews` ADD `replyTime` timestamp;--> statement-breakpoint
ALTER TABLE `integrationSettings` ADD `googleLocationName` varchar(255);--> statement-breakpoint
ALTER TABLE `googleReviews` DROP COLUMN `reviewText`;--> statement-breakpoint
ALTER TABLE `googleReviews` DROP COLUMN `reviewTime`;--> statement-breakpoint
ALTER TABLE `googleReviews` DROP COLUMN `isVerifiedBuyer`;