# 📝 Taskboard - Suivi des TPs Angular v20

Ce projet est une application de gestion de tâches développée avec **Angular v20**. L'architecture repose entièrement sur des **Composants Standalone**.

---

## 🏗️ TP1 : Architecture et Routage
Mise en place de la structure de base et de la navigation.

### Fonctionnalités
- **Architecture Standalone** : Utilisation de `bootstrapApplication` sans `AppModule`.
- **Routage Dynamique** : Navigation entre l'Accueil (`/`) et la page À propos (`/about`).
- **Navbar Réutilisable** : Composant isolé avec gestion automatique des liens actifs via `RouterLinkActive`.

### Concepts clés
- `app.component.routes.ts` : Configuration centralisée du routeur.
- **Control Flow** : Utilisation des nouvelles syntaxes `@if` et `@for`.

---

## ⚡ TP2 : Services et Réactivité
Implémentation de la logique métier et gestion de l'état des données.

### Fonctionnalités
- **Service Centralisé** : Création de `TaskService` dans `core/services/` pour gérer les données.
- **Programmation Réactive** : Utilisation de `BehaviorSubject` et de l'Observable `tasks$` pour diffuser les mises à jour.
- **Gestion des Tâches** : Formulaire d'ajout rapide avec mise à jour en temps réel de la liste.

### Ajouts techniques
- **Injection de dépendances** : Utilisation de la fonction `inject(TaskService)`.
- **AsyncPipe** : Consommation directe des flux de données dans le template pour une gestion propre de la souscription.
- **Interaction Template-TS** : Utilisation de variables locales (`#taskInput`) pour récupérer les valeurs du DOM.

---

## 📂 Structure finale du projet (src/app)
```text
src/app/
├── core/
│   └── services/       # Logique métier (TaskService)
├── layout/
│   └── navbar/         # Composant de navigation
├── home/               # Page principale (Gestion des tâches)
├── about/              # Page d'information
├── app.component.ts    # Racine de l'application
├── app.component.routes.ts
└── app.component.config.ts
```

## 🛠️ Installation et Démarrage

1. **Cloner le projet** :
   ```bash
   git clone <url-du-repo>
   cd taskboard
   ```
2. **Installer les dépendances** :
  ```bash
  npm install
  ```
3. **Lancer le serveur de développement** :
  ```bash
  ng serve
  ```
Rendez-vous sur http://localhost:4200/.
