CREATE TABLE IF NOT EXISTS `banco` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome_banco` varchar(255) DEFAULT NULL,
  `url_imagem` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;