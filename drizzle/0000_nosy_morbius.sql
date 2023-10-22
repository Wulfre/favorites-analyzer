CREATE TABLE `tag` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`post_count` integer NOT NULL,
	`related_tags` text NOT NULL,
	`related_tags_updated_at` integer NOT NULL,
	`category` integer NOT NULL,
	`is_locked` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
