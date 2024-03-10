/*
  Warnings:

  - Added the required column `amphure` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tambon` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `amphure` VARCHAR(191) NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL,
    ADD COLUMN `tambon` VARCHAR(191) NOT NULL;
