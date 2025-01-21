/*
  Warnings:

  - You are about to drop the column `feedback_category_id` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_feedback_category_id_fkey";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "feedback_category_id",
ADD COLUMN     "category_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "FeedbackCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
