/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `meals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "meals_userId_key" ON "meals"("userId");
