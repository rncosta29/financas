CREATE TABLE IF NOT EXISTS `estabelecimento_banco` (
  `id_estabelecimento` bigint(20) NOT NULL,
  `id_banco` bigint(20) NOT NULL,
  PRIMARY KEY (`id_estabelecimento`,`id_banco`),
  KEY `fk_estabelecimento_banco_banco` (`id_banco`),
  CONSTRAINT `fk_estabelecimento_banco` FOREIGN KEY (`id_estabelecimento`) REFERENCES `estabelecimento` (`id`),
  CONSTRAINT `fk_estabelecimento_banco_banco` FOREIGN KEY (`id_banco`) REFERENCES `banco` (`id`)
) ENGINE=InnoDB;