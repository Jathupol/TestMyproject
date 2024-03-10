/*
  Warnings:

  - You are about to drop the column `service` on the `service` table. All the data in the column will be lost.
  - Added the required column `typeOfService` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `service` DROP COLUMN `service`,
    ADD COLUMN `typeOfService` VARCHAR(191) NOT NULL;
