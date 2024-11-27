/*
  Warnings:

  - You are about to drop the `_TacheToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UtilisateurProjets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UtilisateurTaches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `projetId` on the `Tache` table. All the data in the column will be lost.
  - You are about to drop the column `sousTacheId` on the `Tache` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_TacheToTag_B_index";

-- DropIndex
DROP INDEX "_TacheToTag_AB_unique";

-- DropIndex
DROP INDEX "_UtilisateurProjets_B_index";

-- DropIndex
DROP INDEX "_UtilisateurProjets_AB_unique";

-- DropIndex
DROP INDEX "_UtilisateurTaches_B_index";

-- DropIndex
DROP INDEX "_UtilisateurTaches_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_TacheToTag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UtilisateurProjets";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UtilisateurTaches";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Affecter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_utilisateur" INTEGER NOT NULL,
    "id_tache" INTEGER NOT NULL,
    CONSTRAINT "Affecter_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Affecter_id_tache_fkey" FOREIGN KEY ("id_tache") REFERENCES "Tache" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Associer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_utilisateur" INTEGER NOT NULL,
    "id_projet" INTEGER NOT NULL,
    CONSTRAINT "Associer_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Associer_id_projet_fkey" FOREIGN KEY ("id_projet") REFERENCES "Projet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Posseder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tag" INTEGER NOT NULL,
    "id_tache" INTEGER NOT NULL,
    CONSTRAINT "Posseder_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Posseder_id_tache_fkey" FOREIGN KEY ("id_tache") REFERENCES "Tache" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "Tache_sous_tache_fkey" FOREIGN KEY ("sous_tache") REFERENCES "Tache" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tache_statutId_fkey" FOREIGN KEY ("statutId") REFERENCES "Statut" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tache" ("date_creation", "date_echeance", "description", "id", "priorite", "statutId", "titre") SELECT "date_creation", "date_echeance", "description", "id", "priorite", "statutId", "titre" FROM "Tache";
DROP TABLE "Tache";
ALTER TABLE "new_Tache" RENAME TO "Tache";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
