/*
  Warnings:

  - You are about to drop the column `typeOfService` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `typeOfService` on the `user` table. All the data in the column will be lost.
  - Added the required column `service` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `service` DROP COLUMN `typeOfService`,
    ADD COLUMN `service` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `typeOfService`,
    ADD COLUMN `service` VARCHAR(191) NOT NULL;
