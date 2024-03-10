/*
  Warnings:

  - You are about to drop the column `typeOfService` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `typeOfService`;

-- DropTable
DROP TABLE `customer`;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `numberPhone` VARCHAR(191) NULL,
    `typeOfService` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `amphure` VARCHAR(191) NOT NULL,
    `tambon` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Service_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
