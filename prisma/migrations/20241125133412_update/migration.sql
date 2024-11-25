-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tache" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "projetId" INTEGER,
    "date_creation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_echeance" DATETIME NOT NULL,
    "statutId" INTEGER,
    "priorite" INTEGER NOT NULL,
    "sousTacheId" INTEGER,
    "utilisateurId" INTEGER,
    CONSTRAINT "Tache_projetId_fkey" FOREIGN KEY ("projetId") REFERENCES "Projet" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tache_statutId_fkey" FOREIGN KEY ("statutId") REFERENCES "Statut" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tache_sousTacheId_fkey" FOREIGN KEY ("sousTacheId") REFERENCES "Tache" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tache_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tache" ("date_creation", "date_echeance", "description", "id", "priorite", "projetId", "sousTacheId", "statutId", "titre", "utilisateurId") SELECT "date_creation", "date_echeance", "description", "id", "priorite", "projetId", "sousTacheId", "statutId", "titre", "utilisateurId" FROM "Tache";
DROP TABLE "Tache";
ALTER TABLE "new_Tache" RENAME TO "Tache";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
