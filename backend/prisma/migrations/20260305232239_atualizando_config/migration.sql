/*
  Warnings:

  - Changed the type of `dias` on the `Config` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `horarios` on the `Config` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Config" DROP COLUMN "dias",
ADD COLUMN     "dias" JSONB NOT NULL,
DROP COLUMN "horarios",
ADD COLUMN     "horarios" JSONB NOT NULL;
