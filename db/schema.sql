CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burgers(
   id int NOT NULL AUTO_INCREMENT,
   burger_name VARCHAR(255) NOT NULL,
   devoured BOOLEAN DEFAULT false,
   createdAt TIMESTAMP NOT NULL,
   PRIMARY KEY (id)
   );
