/*
  Warnings:

  - You are about to drop the column `utilisateurId` on the `Tache` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tache" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "projetId" INTEGER NOT NULL,
    "date_creation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_echeance" DATETIME,
    "statutId" INTEGER NOT NULL,
    "priorite" INTEGER,
    "sousTacheId" INTEGER,
    CONSTRAINT "Tache_projetId_fkey" FOREIGN KEY ("projetId") REFERENCES "Projet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tache_statutId_fkey" FOREIGN KEY ("statutId") REFERENCES "Statut" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tache_sousTacheId_fkey" FOREIGN KEY ("sousTacheId") REFERENCES "Tache" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tache" ("date_creation", "date_echeance", "description", "id", "priorite", "projetId", "sousTacheId", "statutId", "titre") SELECT "date_creation", "date_echeance", "description", "id", "priorite", "projetId", "sousTacheId", "statutId", "titre" FROM "Tache";
DROP TABLE "Tache";
ALTER TABLE "new_Tache" RENAME TO "Tache";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
