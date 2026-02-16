/*
  Warnings:

  - You are about to drop the column `fromTime` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `toTime` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `toTole` on the `TutorSession` table. All the data in the column will be lost.
  - Added the required column `toTime` to the `TutorSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'COMPLETED';

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "fromTime",
DROP COLUMN "toTime";

-- AlterTable
ALTER TABLE "TutorSession" DROP COLUMN "toTole",
ADD COLUMN     "toTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "sessionFee" SET DATA TYPE DOUBLE PRECISION;
