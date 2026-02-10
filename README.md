# 🏯 TaskBoard Pro - Angular Modern Edition

Ce projet est la réalisation du fil rouge "TaskBoard Pro". Il s'agit d'une application de gestion de tâches (To-Do List) développée avec **Angular (v17+)**.

L'application respecte les consignes des TP 1, 2 et 3 tout en intégrant une architecture **Full Standalone** et une gestion d'état hybride (**RxJS + Signals**).

---

## 🚀 Installation et Démarrage

1. **Cloner le projet** :
```bash
git clone <url-du-repo>
cd taskboard-pro

```


2. **Installer les dépendances** :
```bash
npm install

```


3. **Lancer le serveur** :
```bash
ng serve

```


L'application sera accessible sur `http://localhost:4200/`.

---

## 🛠️ TP 1 : Architecture et Routing

Mise en place du squelette de l'application et de la navigation.

* **Architecture** : Projet généré en mode **Standalone** (pas de `AppModule`).
* **Routing** :
* La route `/` charge le composant `Home` (ou redirection vers `/tasks`).
* La route `/about` charge le composant `About`.


* **Navigation** : Utilisation de `routerLink` et `routerLinkActive` pour gérer le menu et la classe CSS active.

**Commande utilisée** :

```bash
ng new taskboard-pro --style=css

```

---

## 🔄 TP 2 : Logique Réactive (RxJS)

Implémentation du cœur réactif de l'application via le pattern **Service-as-a-Source-of-Truth**.

### 1. Structure du flux de données

* **Service (`TaskService`)** : Il détient un `BehaviorSubject` privé qui contient la liste brute des tâches. C'est la source de vérité unique.
* **Exposition** : Les données sont exposées via un Observable public `tasks$` (pour respecter le TP) qui est ensuite converti en **Signal** dans le composant pour une meilleure performance.

### 2. Méthodes implémentées

* `addTask(title, description)` : Ajoute une tâche et émet la nouvelle liste via `.next()`.
* `deleteTask(id)` : Filtre la liste pour retirer l'élément ciblé et met à jour le flux.
* **Mise à jour Vue** : Grâce à la réactivité, aucune méthode `getTasks()` n'est appelée manuellement. La vue se met à jour automatiquement dès que le flux change.

---

## 📦 TP 3 : Lazy Loading & Fonctionnalités Avancées

C'est dans cette séquence que l'application devient performante et riche en fonctionnalités.

### 1. Lazy Loading (Chargement Fainéant)

Le Lazy Loading est une technique d'optimisation. Au lieu de charger toute l'application d'un coup, Angular ne charge le code JavaScript des fonctionnalités (ex: `/tasks` ou `/about`) **que lorsque l'utilisateur navigue dessus**.

**Implémentation dans `app.routes.ts**` :

```typescript
{
  path: 'tasks',
  loadComponent: () => import('./features/tasks/tasks-page.component').then(m => m.TasksPageComponent)
}

```

### 2. Composants Dynamiques & Structure Features

L'application est structurée par "fonctionnalités" (`features/`) plutôt que par type technique.

* **Formulaire d'ajout** : Utilisation du `[(ngModel)]` pour lier l'input au code (Two-Way Binding) et validation avec la touche `Enter`.
* **Composant Edit (Modale)** : Un composant `TaskEdit` est injecté dynamiquement dans le DOM (via le Control Flow `@if`) lorsqu'une tâche est en cours d'édition.

### 3. Fonctionnalités Bonus (Implémentées) 🌟

* **✅ Marquer comme terminée** : Bascule un booléen `completed` et applique un style barré/grisé.
* **📊 Statistiques (`map`)** : Un composant dédié calcule en temps réel le total, le nombre de tâches actives et terminées.
* **🔔 Notifications (`tap`)** : Utilisation de l'opérateur `tap` dans le service pour déclencher des effets de bord (Toasts/Notifications) sans altérer le flux de données.
* **🏯 Thème "Ronin"** : Interface utilisateur soignée avec animations et design system cohérent.

---

## 📂 Structure du Projet

```text
src/app/
├── core/
│   └── services/        
│       ├── task.service.ts         # Logique métier + RxJS (Subject, map, tap)
│       └── notification.service.ts # Service de feedback
├── features/
│   ├── about/                      # Page "À propos" (Lazy Loaded)
│   └── tasks/                      # Feature principale (Lazy Loaded)
│       ├── tasks-page/             # Smart Component (Gestionnaire)
│       ├── task-stats/             # Composant de présentation (Stats)
│       └── task-edit/              # Modale d'édition
├── layout/
│   └── navbar/                     # Navigation globale
├── app.routes.ts                   # Configuration du Lazy Loading
└── app.component.ts                # Racine (Router Outlet)

```

---

## 📝 Bilan Technique

| Concept | Implémentation dans ce projet |
| --- | --- |
| **Store** | `BehaviorSubject` (RxJS) dans `TaskService` |
| **Consommation** | `toSignal` (Angular Interop) pour transformer le flux RxJS en Signal |
| **Templates** | Nouvelle syntaxe Control Flow (`@if`, `@for`) |
| **Injection** | Fonction `inject()` (plus moderne que le constructeur) |
| **Styles** | CSS Scoped & Design System personnalisé |
