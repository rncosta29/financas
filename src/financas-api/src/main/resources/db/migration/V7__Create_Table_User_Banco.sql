CREATE TABLE IF NOT EXISTS `user_banco` (
  `id_user` bigint(20) NOT NULL,
  `id_banco` bigint(20) NOT NULL,
  PRIMARY KEY (`id_user`,`id_banco`),
  KEY `fk_user_banco_banco` (`id_banco`),
  CONSTRAINT `fk_user_banco` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_user_banco_banco` FOREIGN KEY (`id_banco`) REFERENCES `banco` (`id`)
) ENGINE=InnoDB;