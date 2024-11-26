/*
  Warnings:

  - Added the required column `projetId` to the `Statut` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tache" ADD COLUMN "utilisateurId" INTEGER;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Statut" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "projetId" INTEGER NOT NULL,
    CONSTRAINT "Statut_projetId_fkey" FOREIGN KEY ("projetId") REFERENCES "Projet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Statut" ("id", "nom") SELECT "id", "nom" FROM "Statut";
DROP TABLE "Statut";
ALTER TABLE "new_Statut" RENAME TO "Statut";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
