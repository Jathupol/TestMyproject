/*
  Warnings:

  - You are about to drop the column `username` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `amphure` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `tambon` on the `user` table. All the data in the column will be lost.
  - Added the required column `fName` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lName` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `service` DROP COLUMN `username`,
    ADD COLUMN `fName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `amphure`,
    DROP COLUMN `province`,
    DROP COLUMN `service`,
    DROP COLUMN `tambon`;
