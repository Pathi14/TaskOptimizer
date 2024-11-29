-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Affecter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_utilisateur" INTEGER NOT NULL,
    "id_tache" INTEGER NOT NULL,
    CONSTRAINT "Affecter_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Affecter_id_tache_fkey" FOREIGN KEY ("id_tache") REFERENCES "Tache" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Affecter" ("id", "id_tache", "id_utilisateur") SELECT "id", "id_tache", "id_utilisateur" FROM "Affecter";
DROP TABLE "Affecter";
ALTER TABLE "new_Affecter" RENAME TO "Affecter";
CREATE TABLE "new_Associer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_utilisateur" INTEGER NOT NULL,
    "id_projet" INTEGER NOT NULL,
    CONSTRAINT "Associer_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Associer_id_projet_fkey" FOREIGN KEY ("id_projet") REFERENCES "Projet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Associer" ("id", "id_projet", "id_utilisateur") SELECT "id", "id_projet", "id_utilisateur" FROM "Associer";
DROP TABLE "Associer";
ALTER TABLE "new_Associer" RENAME TO "Associer";
CREATE TABLE "new_Posseder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tag" INTEGER NOT NULL,
    "id_tache" INTEGER NOT NULL,
    CONSTRAINT "Posseder_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Posseder_id_tache_fkey" FOREIGN KEY ("id_tache") REFERENCES "Tache" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Posseder" ("id", "id_tache", "id_tag") SELECT "id", "id_tache", "id_tag" FROM "Posseder";
DROP TABLE "Posseder";
ALTER TABLE "new_Posseder" RENAME TO "Posseder";
CREATE TABLE "new_Statut" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "projetId" INTEGER NOT NULL,
    CONSTRAINT "Statut_projetId_fkey" FOREIGN KEY ("projetId") REFERENCES "Projet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Statut" ("id", "nom", "projetId") SELECT "id", "nom", "projetId" FROM "Statut";
DROP TABLE "Statut";
ALTER TABLE "new_Statut" RENAME TO "Statut";
CREATE TABLE "new_Tache" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "date_creation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_echeance" DATETIME,
    "priorite" INTEGER,
    "sous_tache" INTEGER,
    "evolution" INTEGER,
    "statutId" INTEGER NOT NULL,
    CONSTRAINT "Tache_sous_tache_fkey" FOREIGN KEY ("sous_tache") REFERENCES "Tache" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Tache_statutId_fkey" FOREIGN KEY ("statutId") REFERENCES "Statut" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tache" ("date_creation", "date_echeance", "description", "evolution", "id", "priorite", "sous_tache", "statutId", "titre") SELECT "date_creation", "date_echeance", "description", "evolution", "id", "priorite", "sous_tache", "statutId", "titre" FROM "Tache";
DROP TABLE "Tache";
ALTER TABLE "new_Tache" RENAME TO "Tache";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
