-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "adresse_mail" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tache" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projetId" INTEGER NOT NULL,
    "date_creation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_echeance" DATETIME NOT NULL,
    "statutId" INTEGER NOT NULL,
    "priorite" INTEGER NOT NULL,
    "sousTacheId" INTEGER,
    "utilisateurId" INTEGER NOT NULL,
    CONSTRAINT "Tache_projetId_fkey" FOREIGN KEY ("projetId") REFERENCES "Projet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tache_statutId_fkey" FOREIGN KEY ("statutId") REFERENCES "Statut" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tache_sousTacheId_fkey" FOREIGN KEY ("sousTacheId") REFERENCES "Tache" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tache_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Projet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    CONSTRAINT "Projet_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Statut" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type_tag" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TacheToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TacheToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Tache" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TacheToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_adresse_mail_key" ON "Utilisateur"("adresse_mail");

-- CreateIndex
CREATE UNIQUE INDEX "_TacheToTag_AB_unique" ON "_TacheToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_TacheToTag_B_index" ON "_TacheToTag"("B");
