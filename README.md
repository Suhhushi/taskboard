# 📝 Taskboard - TP1 Angular v20

Ce projet est une application de gestion de tâches (Taskboard) développée avec **Angular v20**. L'architecture repose entièrement sur des **Composants Standalone**, supprimant ainsi le besoin de modules traditionnels (`AppModule`).

## 🚀 Fonctionnalités
- **Architecture Standalone** : Utilisation de `bootstrapApplication` et composants indépendants.
- **Routage Dynamique** : Navigation entre l'Accueil (`/`) et la page À propos (`/about`).
- **Navbar Réutilisable** : Composant de navigation isolé avec gestion des liens actifs.
- **Styles Modernes** : Mise en page responsive avec une structure de fichiers claire.

## 📂 Structure du projet (src/app)
L'organisation des fichiers suit les dernières recommandations Angular :

- `layout/navbar/` : Composant de navigation global.
- `home/` : Composant de la page d'accueil (affichage des tâches).
- `about/` : Composant de la page de présentation.
- `app.component.ts` : Composant racine gérant le layout global.
- `app.component.routes.ts` : Définition des routes de l'application.
- `app.component.config.ts` : Configuration des providers (Router, etc.).

## 🛠️ Installation et Démarrage

1. **Cloner le projet** :
   ```bash
   git clone <url-du-repo>
   cd taskboard
Installer les dépendances :

`bash
npm install`
Lancer le serveur de développement :

`bash
ng serve`

Rendez-vous sur http://localhost:4200/.

💡 Concepts clés utilisés
Control Flow : Utilisation de @if et @for pour le rendu conditionnel et les listes.

RouterLink & RouterLinkActive : Pour une navigation fluide sans rechargement.

Standalone Configuration : Centralisation des services dans app.component.config.ts.
