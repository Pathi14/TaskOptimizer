# TaskOptimizer

Une application web intuitive et collaborative pour organiser, suivre et gérer vos tâches efficacement.

---

## Description du projet

TaskOptimizer est une application web conçue pour simplifier la gestion des tâches et aider les utilisateurs à organiser efficacement leurs projets.  
Elle propose une interface intuitive et des fonctionnalités pour créer, structurer et suivre les tâches de manière optimale.

Chaque tâche peut inclure :  
- Un **titre** et une **description** détaillée.  
- Un **projet d’appartenance**.  
- Une **date de création** et une **date d’échéance**.  
- Une **priorité**, un **statut**, une **évolution** et des **tags**.  
- Une possibilité de **décomposition en sous-tâches** avec une hiérarchie sans limite.

---

## Fonctionnalités principales finales

- **Création de tâches** :  
  Les utilisateurs peuvent créer des tâches en ajoutant un titre, une description, une priorité, une échéance, des tags et d’autres informations pertinentes.

- **Organisation des tâches** :  
  Les tâches peuvent être affichées et classées par projet, par liste, par tag ou par date d’échéance.

- **Mise à jour et suppression** :  
  Les utilisateurs peuvent modifier ou supprimer les informations associées à une tâche.

- **Attribution des tâches** :  
  Les tâches peuvent être assignées à d’autres utilisateurs pour faciliter la gestion collaborative.

- **Suivi de l’avancement** :  
  Chaque tâche dispose d’un statut évolutif (par exemple : "À faire", "En cours", "Terminée").

- **Notifications** :  
  Les utilisateurs reçoivent des notifications (notamment par email via [Ethereal](https://ethereal.email/)) lorsqu’une tâche leur est attribuée, modifiée, ou qu’une échéance approche.

- **Collaboration en temps réel** :  
  L’application permet aux utilisateurs de travailler simultanément sur des tâches partagées pour améliorer la collaboration en équipe.

---

## MVP du projet

Fonctionnalités choisies pour la version initiale du projet :

  - S’authentifier
  - Créer un projet
  - Créer, modifier, supprimer, lire une liste (status) 
  - Créer, modifier, supprimer, lire une tâche avec un titre, une description, une date de fin et une date de  création avec status
  - Afficher la liste des tâches
  - Afficher les détails d'une tâche
  - Déplacer une tâche suivant les différents status


---

## Technologies utilisées

### **Backend**  
- [NestJS](https://nestjs.com) : Framework backend pour la création d’API performantes et modulaires.

### **Frontend**  
- [React](https://reactjs.org) avec [Next.js](https://nextjs.org) : Framework frontend pour des interfaces dynamiques et performantes.

### **Base de données**  
- [SQLite](https://sqlite.org) : Base de données légère et intégrée.

### **Modélisation de la base de données**  
- [DB Designer](https://www.dbdesigner.net) : Outil en ligne pour la création de MCD (Modèle Conceptuel de Données).

### **Éditeur de code**  
- [Visual Studio Code](https://code.visualstudio.com) : Éditeur de code puissant et extensible.

### **Collaboration**  
- [GitHub](https://github.com) : Hébergement du code source et gestion des versions.  
- [GitHub Projects](https://github.com/features/issues) : Organisation des tâches et gestion de projet.

---

## Installation et utilisation

1. **Clonez le repository** :
  ```bash
  git clone https://github.com/Pathi14/TaskOptimizer.git
  cd TaskOptimizer


2. **Installez les dépendances** :
  ```bash
  Backend :
  npm install

  Frontend :
  npm run start


3. **Lancez le projet** :
  ```bash
  Backend :
  npm install

  Frontend :
  npm run start


4. **Accédez à l’application dans votre navigateur à l’adresse** :
   ```bash
    http://localhost:3000