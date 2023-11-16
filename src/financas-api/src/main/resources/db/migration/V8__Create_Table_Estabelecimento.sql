CREATE TABLE IF NOT EXISTS `estabelecimento` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `data_compra` datetime(6) DEFAULT NULL,
  `estabelecimento` varchar(255) DEFAULT NULL,
  `valor` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;