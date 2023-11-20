ALTER TABLE banco
DROP COLUMN url_imagem;

ALTER TABLE banco
ADD url_imagem int DEFAULT NULL;