/*
  Warnings:

  - You are about to drop the column `utilisateurId` on the `Projet` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_ProjetToUtilisateur" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProjetToUtilisateur_A_fkey" FOREIGN KEY ("A") REFERENCES "Projet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjetToUtilisateur_B_fkey" FOREIGN KEY ("B") REFERENCES "Utilisateur" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Projet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Projet" ("description", "id", "titre") SELECT "description", "id", "titre" FROM "Projet";
DROP TABLE "Projet";
ALTER TABLE "new_Projet" RENAME TO "Projet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ProjetToUtilisateur_AB_unique" ON "_ProjetToUtilisateur"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjetToUtilisateur_B_index" ON "_ProjetToUtilisateur"("B");
