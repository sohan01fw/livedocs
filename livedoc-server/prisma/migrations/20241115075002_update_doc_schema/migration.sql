-- DropIndex
DROP INDEX "Doc_userId_key";

-- AlterTable
ALTER TABLE "Doc" ALTER COLUMN "content" SET DEFAULT ARRAY[]::JSONB[];
