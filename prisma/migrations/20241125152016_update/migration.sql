/*
  Warnings:

  - You are about to drop the `_ProjetToUtilisateur` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProjetToUtilisateur";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_UtilisateurProjets" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UtilisateurProjets_A_fkey" FOREIGN KEY ("A") REFERENCES "Projet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UtilisateurProjets_B_fkey" FOREIGN KEY ("B") REFERENCES "Utilisateur" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UtilisateurProjets_AB_unique" ON "_UtilisateurProjets"("A", "B");

-- CreateIndex
CREATE INDEX "_UtilisateurProjets_B_index" ON "_UtilisateurProjets"("B");
