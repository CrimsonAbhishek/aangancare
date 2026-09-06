ALTER TABLE `serviceRequests` ADD `consentToProcess` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `serviceRequests` ADD `termsAcknowledged` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `serviceRequests` ADD `privacyPolicyVersion` varchar(40) DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE `serviceRequests` ADD `termsVersion` varchar(40) DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE `serviceRequests` ADD `consentAt` timestamp DEFAULT (now()) NOT NULL;