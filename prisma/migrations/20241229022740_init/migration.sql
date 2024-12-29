-- AlterTable
ALTER TABLE "Url" ALTER COLUMN "accessCount" SET DEFAULT 0,
ALTER COLUMN "accessCount" DROP DEFAULT;
DROP SEQUENCE "Url_accessCount_seq";
