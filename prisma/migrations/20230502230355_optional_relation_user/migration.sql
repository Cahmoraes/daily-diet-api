-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_meals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "inDiet" BOOLEAN NOT NULL,
    "date" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_meals" ("date", "description", "hours", "id", "inDiet", "name", "userId") SELECT "date", "description", "hours", "id", "inDiet", "name", "userId" FROM "meals";
DROP TABLE "meals";
ALTER TABLE "new_meals" RENAME TO "meals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
