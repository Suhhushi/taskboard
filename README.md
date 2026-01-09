# 📝 Taskboard - Suivi des TPs Angular v20

Ce projet est une application de gestion de tâches développée avec **Angular v20**. L'architecture repose entièrement sur des **Composants Standalone**.

---

## Procédure de travail (Git)
Pour ce TP, la gestion des branches a été effectuée comme suit :
1. **Création de la branche** : `git checkout -b Lazy-Highlight`
2. **Sauvegarde** : `git add .`
3. **Commit** : `git commit -m "Implémentation Lazy Loading, Composants dynamiques et Bonus RxJS"`

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

## TP3 : Lazy Loading & Composants Dynamiques
Optimisation des performances et amélioration de l'expérience utilisateur avec des fonctionnalités avancées.

### Concepts Théoriques
* **Lazy Loading (Chargement fainéant)** : C'est une technique d'optimisation qui consiste à ne charger les fichiers JavaScript d'une page (ou fonctionnalité) que lorsque l'utilisateur navigue dessus (via `loadComponent`). Cela allège le démarrage de l'application.
* **Architecture Features** : Structurer l'application par "fonctionnalités" (ex: dossier `/tasks`, dossier `/about`) plutôt que par type technique. Cela rend le code plus modulaire, maintenable et facilite le Lazy Loading.
* **Composant Dynamique** : C'est un composant qui n'est pas écrit "en dur" dans le HTML, mais qui peut être instancié ou affiché programmatiquement selon des conditions logiques.
* **ViewContainerRef & createComponent()** :
    * `ViewContainerRef` représente un emplacement dans le DOM (souvent attaché à une balise `<ng-container>`) où l'on peut insérer des vues.
    * `createComponent()` est la méthode qui permet d'instancier une classe de composant Angular et de l'injecter dynamiquement dans ce conteneur.

### Fonctionnalités Bonus Implémentées (Theme "Samouraï") 🏯
L'application a été enrichie avec une interface utilisateur thématique et des opérateurs RxJS avancés :

#### 1. UI/UX Avancée
* **Design System** : Thème Zen/Papier de riz, typographie "Noto Serif JP".
* **Interactions** : Cartes cliquables, effet "Glow" sur les tâches prioritaires, animations CSS.
* **Formulaire Riche** : Saisie du titre et description, validation avec `Enter` et `Ctrl+Enter`.

#### 2. RxJS Avancé (`map` & `tap`)
* **Opérateur `map()`** : Utilisé à deux niveaux :
    * *Dans le Service* : Pour trier automatiquement les tâches (les tâches "Illuminées/Prioritaires" remontent automatiquement en haut de la liste).
    * *Dans les Stats* : Pour transformer le tableau de tâches en un objet de statistiques (Total, En cours, Terminées, %).
* **Opérateur `tap()`** : Utilisé dans le `TaskService` pour déclencher des effets de bord (logs) sans modifier le flux de données.

#### 3. Notifications & Feedback
* **Service de Notification** : Un `NotificationService` injecté globalement affiche des messages flottants (Toasts) à chaque action (Ajout, Suppression, Modification).

---

## Structure finale du projet
```text
src/app/
├── core/
│   └── services/       
│       ├── task.service.ts         # Logique métier + RxJS (map, tap)
│       └── notification.service.ts # Gestion des alertes
├── features/
│   ├── about/                      # Chargé en Lazy Loading
│   └── tasks/                      # Feature principale (Lazy Loading)
│       ├── tasks-page/             # Composant intelligent (Smart Component)
│       ├── task-stats/             # Composant de présentation (Stats)
│       └── task-edit/              # Composant Modale (Édition)
├── layout/
│   └── navbar/                     # Composant de navigation
├── app.routes.ts                   # Configuration du Lazy Loading
└── app.component.ts                # Racine
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
