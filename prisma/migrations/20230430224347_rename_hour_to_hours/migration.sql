/*
  Warnings:

  - You are about to drop the column `hour` on the `meals` table. All the data in the column will be lost.
  - Added the required column `hours` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_meals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "inDiet" BOOLEAN NOT NULL,
    "date" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_meals" ("date", "description", "id", "inDiet", "name", "userId") SELECT "date", "description", "id", "inDiet", "name", "userId" FROM "meals";
DROP TABLE "meals";
ALTER TABLE "new_meals" RENAME TO "meals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
