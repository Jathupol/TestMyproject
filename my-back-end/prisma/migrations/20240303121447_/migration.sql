/*
  Warnings:

  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `typeOfService` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `typeOfService` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `service`;

-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `numberPhone` VARCHAR(191) NULL,
    `province` VARCHAR(191) NOT NULL,
    `amphure` VARCHAR(191) NOT NULL,
    `tambon` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `customer_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `post` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `like` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
