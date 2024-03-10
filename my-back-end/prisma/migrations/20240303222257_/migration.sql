/*
  Warnings:

  - You are about to drop the column `amphure` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `tambon` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `amphure`,
    DROP COLUMN `province`,
    DROP COLUMN `tambon`;
