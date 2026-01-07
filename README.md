# 📝 Taskboard - Suivi des TPs Angular v20

Ce projet est une application de gestion de tâches développée avec **Angular v20**. L'architecture repose entièrement sur des **Composants Standalone**.

---

## Procédure de travail (Git)
Pour ce TP, la gestion des branches a été effectuée comme suit :
1. **Création de la branche** : `git checkout -b sequence-2-rxjs`
2. **Sauvegarde** : `git add .`
3. **Commit** : `git commit -m "Mise en place de la réactivité avec RxJS"`

---

## TP1 : Architecture et Routage
Mise en place de la structure de base et de la navigation.
- **Architecture Standalone** : Utilisation de `bootstrapApplication` sans `AppModule`.
- **Routage Dynamique** : Navigation entre l'Accueil (`/`) et la page À propos (`/about`).
- **Navbar Réutilisable** : Composant isolé avec gestion automatique des liens actifs via `RouterLinkActive`.

---

## TP2 : Réactivité avec RxJS
Implémentation de la logique métier et gestion de l'état des données avec les Observables.

### Notions clés comprises
* **BehaviorSubject** : C'est un type d'Observable qui garde toujours en mémoire la **dernière valeur** émise. Lorsqu'un composant s'y abonne, il reçoit immédiatement la valeur actuelle. C'est l'outil idéal pour gérer un état (comme une liste de tâches) qui évolue dans le temps.
* **Le Pipe `| async`** : Il permet de s'abonner automatiquement à un Observable directement depuis le template HTML. Il gère aussi le désabonnement automatique quand le composant est détruit, évitant ainsi les fuites de mémoire.

### Flux de données (Service ➔ Composant ➔ Template)
1.  **Service** : Le `TaskService` détient la source de vérité (`BehaviorSubject`). Il expose cette donnée sous forme d'Observable (`tasks$`).
2.  **Composant** : Le `HomeComponent` injecte le service et récupère la référence du flux `tasks$` sans y souscrire manuellement dans le code TypeScript.
3.  **Template** : Le HTML utilise `tasks$ | async`. Dès que la méthode `addTask()` est appelée dans le service, le `BehaviorSubject` émet une nouvelle liste, et le template se met à jour instantanément.



---

## Structure finale du projet
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
