CREATE TABLE `user` (
  `id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `profile_img_id` bigint,
  `email` varchar(30),
  `name` varchar(20),
  `phone_number` varchar(15),
  `gender` varchar(10),
  `birth` date,
  `address` varchar(40),
  `position` point,
  `is_deleted` boolean,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
);

CREATE TABLE `restaurant` (
  `id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `category_id` bigint NOT NULL,
  `region_id` bigint NOT NULL,
  `name` varchar(30),
  `address` varchar(40),
  `position` point,
  `status` varchar(10),
  `rate` double,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `category` (
  `id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` varchar(30),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `user_mission` (
  `id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `user_id` bigint NOT NULL,
  `mission_id` bigint NOT NULL,
  `is_finished` boolean,
  `verification` bigint,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `notification` (
  `id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `member_id` bigint NOT NULL,
  `message` varchar(100),
  `is_read` boolean,
  `type` varchar(20),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `mission` (
  `id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `restaurant_id` bigint NOT NULL,
  `title` varchar(15),
  `reward` int,
  `end_date` datetime,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `review` (
  `id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `restaurant_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `rate` double,
  `contents` varchar(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `favor_food` (
  `id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `category_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `point` (
  `id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `user_id` bigint NOT NULL,
  `mission_id` bigint NOT NULL,
  `reward` int,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `invoice` (
  `id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `member_id` bigint NOT NULL,
  `message` varchar(15),
  `is_read` varchar(30),
  `type` text,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `image` (
  `id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `message` text,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `review_image` (
  `id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `review_id` bigint NOT NULL,
  `image_id` bigint NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `invoice_image` (
  `id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `invoice_id` bigint NOT NULL,
  `image_id` bigint NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `region` (
  `id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` varchar(30),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `user` ADD CONSTRAINT `FK_image_TO_user_1` FOREIGN KEY (`profile_img_id`) REFERENCES `image` (`id`);

ALTER TABLE `restaurant` ADD CONSTRAINT `FK_category_TO_restaurant_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `restaurant` ADD CONSTRAINT `FK_region_TO_restaurant_1` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`);

ALTER TABLE `user_mission` ADD CONSTRAINT `FK_user_TO_user_mission_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `user_mission` ADD CONSTRAINT `FK_mission_TO_user_mission_1` FOREIGN KEY (`mission_id`) REFERENCES `mission` (`id`);

ALTER TABLE `notification` ADD CONSTRAINT `FK_user_TO_notification_1` FOREIGN KEY (`member_id`) REFERENCES `user` (`id`);

ALTER TABLE `mission` ADD CONSTRAINT `FK_restaurant_TO_mission_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`);

ALTER TABLE `review` ADD CONSTRAINT `FK_restaurant_TO_review_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`);

ALTER TABLE `review` ADD CONSTRAINT `FK_user_TO_review_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `favor_food` ADD CONSTRAINT `FK_category_TO_favor_food_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `favor_food` ADD CONSTRAINT `FK_user_TO_favor_food_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `point` ADD CONSTRAINT `FK_user_TO_point_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `point` ADD CONSTRAINT `FK_user_mission_TO_point_1` FOREIGN KEY (`mission_id`) REFERENCES `user_mission` (`id`);

ALTER TABLE `invoice` ADD CONSTRAINT `FK_user_TO_invoice_1` FOREIGN KEY (`member_id`) REFERENCES `user` (`id`);

ALTER TABLE `review_image` ADD CONSTRAINT `FK_review_TO_review_image_1` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`);

ALTER TABLE `review_image` ADD CONSTRAINT `FK_image_TO_review_image_1` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`);

ALTER TABLE `invoice_image` ADD CONSTRAINT `FK_invoice_TO_invoice_image_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`);

ALTER TABLE `invoice_image` ADD CONSTRAINT `FK_image_TO_invoice_image_1` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`);
