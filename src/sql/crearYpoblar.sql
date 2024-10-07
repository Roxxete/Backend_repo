-- autor: chatGPT  LOL :-)

DROP DATABASE IF EXISTS PROBANDOKV;

CREATE DATABASE PROBANDOKV;

USE PROBANDOKV;

DROP TABLE IF EXISTS key_value;

-- Create table key_value with key as the primary key
CREATE TABLE key_value (
    `key` VARCHAR(32) PRIMARY KEY,
    `value` TEXT NOT NULL
);

-- Insert a few rows into the table
INSERT INTO key_value (`key`, `value`)
VALUES 
    ('foo', 'bar'),
    ('clave1', 'valor1'),
    ('clave2', 'valor2'),
    ('curso_actual', '2024');


