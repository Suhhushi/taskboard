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

## 🧪 TP 4 : Tests Unitaires (Qualité & Robustesse)

#### 1. Pourquoi tester ?

* **Sécurité du Refactoring** : Les tests m'ont permis de passer de RxJS pur aux Signals sans casser la logique métier.
* **Documentation vivante** : Un test décrit exactement comment un composant est censé fonctionner (ex: "Il ne doit pas sauvegarder si le titre est vide").
* **Exemple concret** : J'ai rencontré l'erreur `NG0950: Input is required`. Grâce au test, j'ai compris que mon composant `TaskEdit` ne pouvait pas exister sans ses données initiales, ce qui m'a forcé à mieux gérer son cycle de vie.

#### 2. Outils utilisés

* **Jasmine** : Le framework pour écrire les scénarios (describe, it, expect).
* **Karma** : Le moteur qui lance le navigateur (Chrome) pour exécuter le code.
* **TestBed** : L'outil d'Angular pour créer un module de test dynamique et isoler le composant.

#### 3. Concepts clés maîtrisés

* **AAA Pattern** : *Arrange* (Préparer les données), *Act* (Cliquer/Exécuter), *Assert* (Vérifier le résultat).
* **Mocks** : J'ai créé des faux services (`mockTaskService`) pour tester mes composants sans dépendre du vrai backend ou du vrai stockage.
* **Spies** : J'ai utilisé `spyOn(window, 'confirm')` pour simuler le clic sur "OK" dans une boîte de dialogue native.
* **Fixture & detectChanges()** : J'ai compris que modifier une variable TS ne met pas à jour le HTML automatiquement dans un test. Il faut appeler `fixture.detectChanges()` pour synchroniser le DOM.

#### 4. Types de tests pratiqués

* ✅ Test d'un service (`TaskService` : ajout, suppression, tri).
* ✅ Test d'un composant avec `TestBed`.
* ✅ Test des **Signals Inputs** (`input.required`).
* ✅ Test des **Outputs** (Vérifier qu'un événement est bien émis vers le parent).
* ✅ Test du DOM (Vérifier la présence de la classe `.completed-card`).

#### 5. Erreurs courantes rencontrées

* **Erreur `NG0950**` : Un `input.required()` n'avait pas de valeur au lancement du test.
* *Solution* : Utiliser `fixture.componentRef.setInput('prop', value)` avant le premier `detectChanges`.


* **Interactions HTML** : Le clic simulé ne déclenchait rien.
* *Solution* : Utiliser `triggerEventHandler('click', null)` ou `nativeElement.click()`.

#### 6. Commandes importantes

```bash
ng test                    # Lancer les tests en mode watch
ng test --code-coverage    # Générer le rapport de couverture (dossier /coverage)

```

#### 7. Code Coverage atteint

* **Objectif** : > 80%
* **Mon résultat** : **100%** sur `TaskEditComponent` (tous les cas limites testés : vide, valide, annulation).

#### 8. Difficultés rencontrées et solutions

| Difficulté | Solution trouvée |
| --- | --- |
| Tester un `input.required()` (Signals) | J'ai appris qu'on ne peut pas juste faire `comp.prop = val`. Il faut utiliser l'API `fixture.componentRef.setInput()`. |
| Empêcher le clic de traverser (`stopPropagation`) | J'ai dû mocker l'objet `$event` dans mes tests : `{ stopPropagation: jasmine.createSpy() }`. |
| Tester `window.confirm` | Utilisation de `spyOn` pour court-circuiter la pop-up du navigateur. |

#### 9. Points à approfondir

* [ ] Tests d'intégration (Flow complet Parent <-> Enfant).
* [ ] Tests E2E avec Cypress ou Playwright.
* [ ] Tester les appels HTTP réels (HttpClientTestingModule).

### 🎯 Projet : Tests TaskBoard Pro

#### Tests implémentés

* [x] **TaskService**
* ✅ `addTask()` : Vérifie l'ajout dans le Subject.
* ✅ `deleteTask()` : Vérifie la suppression par ID.
* ✅ Logique de tri (Priorité > Date).


* [x] **TasksPageComponent** (Dōjō)
* ✅ Affichage des cartes via le Signal.
* ✅ Interaction avec les boutons (Supprimer, Highlight).


* [x] **TaskEditComponent** (Modale)
* ✅ Validation de formulaire.
* ✅ Émission des outputs (`saveTask`, `cancel`).

#### Résultats

* **Tests réussis** : 18 / 18
* **Code coverage** : Excellent (Logique critique couverte).
* **Temps d'exécution** : < 0.5 secondes.

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
