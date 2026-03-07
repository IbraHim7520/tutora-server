/*
  Warnings:

  - The values [PENDING] on the enum `SessionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SessionStatus_new" AS ENUM ('APPROVED', 'BANNED', 'DISCONTINUE');
ALTER TABLE "public"."TutorSession" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "TutorSession" ALTER COLUMN "status" TYPE "SessionStatus_new" USING ("status"::text::"SessionStatus_new");
ALTER TYPE "SessionStatus" RENAME TO "SessionStatus_old";
ALTER TYPE "SessionStatus_new" RENAME TO "SessionStatus";
DROP TYPE "public"."SessionStatus_old";
ALTER TABLE "TutorSession" ALTER COLUMN "status" SET DEFAULT 'APPROVED';
COMMIT;

-- AlterTable
ALTER TABLE "TutorSession" ALTER COLUMN "status" SET DEFAULT 'APPROVED';
