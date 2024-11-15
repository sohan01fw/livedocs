/*
  Warnings:

  - The primary key for the `Doc` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Doc" DROP CONSTRAINT "Doc_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Doc_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Doc_id_seq";
