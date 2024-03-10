/*
  Warnings:

  - You are about to alter the column `numberPhone` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `numberPhone` INTEGER NULL;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `numberPhone` INTEGER NULL,
    `service` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `amphure` VARCHAR(191) NOT NULL,
    `tambon` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Service_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
