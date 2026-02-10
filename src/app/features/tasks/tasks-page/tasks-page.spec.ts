import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksPageComponent } from './tasks-page.component';
import { TaskService, Task } from '../../../core/services/task.service';
import { NotificationService } from '../../../core/services/notification.service';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Pour éviter les erreurs d'anim

describe('TasksPageComponent (Le Dōjō)', () => {
  let component: TasksPageComponent;
  let fixture: ComponentFixture<TasksPageComponent>;

  // 1. Création des Mocks (Doublures) pour les services
  // On crée des versions simplifiées qui ne font rien d'autre que d'être observées
  let mockTaskService: any;
  let mockNotificationService: any;
  let tasksSubject: BehaviorSubject<Task[]>;

  beforeEach(async () => {
    // Initialisation des données simulées
    tasksSubject = new BehaviorSubject<Task[]>([
      { id: 1, title: 'Test Tâche 1', description: 'Desc 1', completed: false, isHighlighted: false },
      { id: 2, title: 'Test Tâche 2', description: 'Desc 2', completed: true, isHighlighted: true }
    ]);

    // Définition du Mock TaskService
    mockTaskService = {
      tasks$: tasksSubject.asObservable(),
      addTask: jasmine.createSpy('addTask'), // Espionne la méthode
      deleteTask: jasmine.createSpy('deleteTask'),
      toggleComplete: jasmine.createSpy('toggleComplete'),
      toggleHighlight: jasmine.createSpy('toggleHighlight'),
      updateTaskData: jasmine.createSpy('updateTaskData')
    };

    // Définition du Mock NotificationService
    mockNotificationService = {
      message$: new BehaviorSubject<string | null>(null),
      show: jasmine.createSpy('show')
    };

    await TestBed.configureTestingModule({
      // Import du composant (Standalone) + Module d'animation désactivé
      imports: [TasksPageComponent, NoopAnimationsModule],
      // Injection des Mocks à la place des vrais services
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksPageComponent);
    component = fixture.componentInstance;
    
    // Déclenche la détection de changement (le pipe async va s'abonner ici)
    fixture.detectChanges();
  });

  // --- TEST 1 : Création ---
  it('doit créer le composant', () => {
    expect(component).toBeTruthy();
  });

  // --- TEST 2 : Affichage ---
  it('doit afficher 2 cartes Samouraï (basé sur le mock)', () => {
    // On cherche tous les éléments avec la classe .samurai-card
    const cards = fixture.debugElement.queryAll(By.css('.samurai-card'));
    expect(cards.length).toBe(2);
  });

  it('doit afficher la classe "completed-card" si la tâche est terminée', () => {
    // La tâche 2 (index 1) est completed: true dans notre mock
    const cards = fixture.debugElement.queryAll(By.css('.samurai-card'));
    const secondCard = cards[1].nativeElement;
    
    expect(secondCard.classList).toContain('completed-card');
  });

  it('doit afficher l\'illumination (Glow) si isHighlighted est true', () => {
    // La tâche 2 est highlighted
    const cards = fixture.debugElement.queryAll(By.css('.samurai-card'));
    const secondCard = cards[1].nativeElement; // C'est l'élément DOM
    
    // Vérifie la classe CSS sur la carte
    expect(secondCard.classList).toContain('illuminated-card');
    
    // Vérifie la présence de la div .glow-aura à l'intérieur
    const aura = cards[1].query(By.css('.glow-aura'));
    expect(aura).toBeTruthy();
  });

  // --- TEST 3 : Interactions (Ajout) ---
  it('doit appeler addTask du service quand on clique sur le bouton "Sceller"', () => {
    // 1. Simuler la saisie utilisateur
    component.newTask.title = 'Nouvelle Mission';
    component.newTask.description = 'Détails';
    
    // 2. Trouver le bouton et cliquer
    const btnAdd = fixture.debugElement.query(By.css('.btn-hanko-large'));
    btnAdd.triggerEventHandler('click', null);

    // 3. Vérifier que l'espion a été appelé avec les bons arguments
    expect(mockTaskService.addTask).toHaveBeenCalledWith('Nouvelle Mission', 'Détails');
  });

  it('ne doit PAS appeler addTask si le titre est vide', () => {
    component.newTask.title = '   '; // Vide ou espaces
    component.addTask();
    
    expect(mockTaskService.addTask).not.toHaveBeenCalled();
  });

  // --- TEST 4 : Interactions (Suppression) ---
  it('doit appeler deleteTask quand on clique sur le bouton épée ⚔️', () => {
    // On prend la première carte
    const deleteBtn = fixture.debugElement.query(By.css('.action-btn.red'));
    
    // Important : il faut simuler l'événement $event pour le stopPropagation
    const mockEvent = { stopPropagation: jasmine.createSpy('stopPropagation') };
    deleteBtn.triggerEventHandler('click', mockEvent);

    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(1); // ID de la tache 1
    expect(mockEvent.stopPropagation).toHaveBeenCalled(); // Vérifie qu'on a bloqué le clic
  });

  // --- TEST 5 : Interactions (Highlight) ---
  it('doit appeler toggleHighlight quand on clique sur l\'étoile ⭐', () => {
    const starBtn = fixture.debugElement.query(By.css('.action-btn.gold'));
    
    const mockEvent = { stopPropagation: jasmine.createSpy('stopPropagation') };
    starBtn.triggerEventHandler('click', mockEvent);

    expect(mockTaskService.toggleHighlight).toHaveBeenCalledWith(1);
  });

});