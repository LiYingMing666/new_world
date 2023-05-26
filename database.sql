CREATE DATABASE myapp;

USE myapp;

CREATE TABLE users (
                       id INT(11) AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       password VARCHAR(100) NOT NULL,
                       email VARCHAR(50) UNIQUE NOT NULL,
                       isAdmin BOOLEAN NOT NULL DEFAULT FALSE
);