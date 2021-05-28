-- MySQL Script generated by MySQL Workbench
-- Fri May 28 11:00:39 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mylo&co
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mylo&co` ;

-- -----------------------------------------------------
-- Schema mylo&co
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mylo&co` DEFAULT CHARACTER SET utf8 ;
USE `mylo&co` ;

-- -----------------------------------------------------
-- Table `mylo&co`.`Dogs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mylo&co`.`Dogs` ;

CREATE TABLE IF NOT EXISTS `mylo&co`.`Dogs` (
  `idDog` INT(11) NOT NULL AUTO_INCREMENT,
  `idUser` INT(11) NOT NULL,
  `icad` INT(11) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `breed` VARCHAR(45) NOT NULL,
  `birthday` DATE NULL DEFAULT NULL,
  `sexe` TINYINT(4) NULL DEFAULT NULL,
  `size` TINYINT(1) NULL DEFAULT NULL,
  `sterile` TINYINT(4) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `dogAttachment` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `uptdateAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idDog`),
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `mylo&co`.`Users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 23
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `idUser` ON `mylo&co`.`Dogs` (`idUser` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mylo&co`.`Invitations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mylo&co`.`Invitations` ;

CREATE TABLE IF NOT EXISTS `mylo&co`.`Invitations` (
  `idWalk` INT(11) NOT NULL,
  `idUser` INT(11) NOT NULL,
  `idDog` INT(11) NOT NULL,
  `Accept` TINYINT(1) NULL DEFAULT NULL,
  CONSTRAINT `invitations_ibfk_1`
    FOREIGN KEY (`idWalk`)
    REFERENCES `mylo&co`.`Walks` (`idWalk`),
  CONSTRAINT `invitations_ibfk_2`
    FOREIGN KEY (`idDog`)
    REFERENCES `mylo&co`.`Dogs` (`idDog`),
  CONSTRAINT `invitations_ibfk_3`
    FOREIGN KEY (`idUser`)
    REFERENCES `mylo&co`.`Dogs` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `idWalk` ON `mylo&co`.`Invitations` (`idWalk` ASC) VISIBLE;

CREATE INDEX `idDog` ON `mylo&co`.`Invitations` (`idDog` ASC) VISIBLE;

CREATE INDEX `idUser` ON `mylo&co`.`Invitations` (`idUser` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mylo&co`.`Marks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mylo&co`.`Marks` ;

CREATE TABLE IF NOT EXISTS `mylo&co`.`Marks` (
  `idMark` INT(11) NOT NULL AUTO_INCREMENT,
  `idUser` INT(11) NOT NULL,
  `idDog` INT(11) NOT NULL,
  `isMarked` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idMark`),
  CONSTRAINT `marks_ibfk_1`
    FOREIGN KEY (`idUser`)
    REFERENCES `mylo&co`.`Users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `marks_ibfk_2`
    FOREIGN KEY (`idDog`)
    REFERENCES `mylo&co`.`Dogs` (`idDog`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `marks_ibfk_1` ON `mylo&co`.`Marks` (`idUser` ASC) VISIBLE;

CREATE INDEX `idDog` ON `mylo&co`.`Marks` (`idDog` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mylo&co`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mylo&co`.`Users` ;

CREATE TABLE IF NOT EXISTS `mylo&co`.`Users` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  `bio` LONGTEXT NULL DEFAULT NULL,
  `userAttachment` VARCHAR(255) NULL DEFAULT NULL,
  `cover` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` TINYINT(1) NOT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mylo&co`.`Walks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mylo&co`.`Walks` ;

CREATE TABLE IF NOT EXISTS `mylo&co`.`Walks` (
  `idWalk` INT(11) NOT NULL AUTO_INCREMENT,
  `idUser` INT(11) NOT NULL,
  `Start` DATETIME NOT NULL,
  `End` DATETIME NOT NULL,
  `Adress` MEDIUMTEXT NOT NULL,
  `Description` LONGTEXT NOT NULL,
  PRIMARY KEY (`idWalk`),
  CONSTRAINT `walks_ibfk_1`
    FOREIGN KEY (`idUser`)
    REFERENCES `mylo&co`.`Users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `idUser` ON `mylo&co`.`Walks` (`idUser` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
