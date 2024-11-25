-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Projet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "utilisateurId" INTEGER,
    CONSTRAINT "Projet_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Projet" ("description", "id", "titre", "utilisateurId") SELECT "description", "id", "titre", "utilisateurId" FROM "Projet";
DROP TABLE "Projet";
ALTER TABLE "new_Projet" RENAME TO "Projet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
