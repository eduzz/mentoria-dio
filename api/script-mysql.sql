USE `mentoriadio`;

CREATE TABLE `source` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE `campaign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `source_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `investment` decimal(10,0) NOT NULL,
  `revenues` decimal(10,0) DEFAULT NULL,
  `begin_date` timestamp NOT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_campaign_user_idx` (`user_id`),
  KEY `fk_campaign_source_idx` (`source_id`),
  CONSTRAINT `fk_campaign_source` FOREIGN KEY (`source_id`) REFERENCES `source` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_campaign_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO `mentoriadio`.`source` (`name`) VALUES ('facebook');
INSERT INTO `mentoriadio`.`source` (`name`) VALUES ('instagram');
INSERT INTO `mentoriadio`.`source` (`name`) VALUES ('whatsapp');
