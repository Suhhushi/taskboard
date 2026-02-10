import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksPageComponent } from './tasks-page.component';
import { TaskService, Task } from '../../../core/services/task.service';
import { NotificationService } from '../../../core/services/notification.service';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TasksPageComponent (Le Dōjō)', () => {
  let component: TasksPageComponent;
  let fixture: ComponentFixture<TasksPageComponent>;

  let mockTaskService: any;
  let mockNotificationService: any;
  let tasksSubject: BehaviorSubject<Task[]>;

  beforeEach(async () => {
    tasksSubject = new BehaviorSubject<Task[]>([
      { id: 1, title: 'Test Tâche 1', description: 'Desc 1', completed: false, isHighlighted: false },
      { id: 2, title: 'Test Tâche 2', description: 'Desc 2', completed: true, isHighlighted: true }
    ]);

    mockTaskService = {
      tasks$: tasksSubject.asObservable(),
      addTask: jasmine.createSpy('addTask'),
      deleteTask: jasmine.createSpy('deleteTask'),
      toggleComplete: jasmine.createSpy('toggleComplete'),
      toggleHighlight: jasmine.createSpy('toggleHighlight'),
      updateTaskData: jasmine.createSpy('updateTaskData')
    };

    mockNotificationService = {
      message$: new BehaviorSubject<string | null>(null),
      show: jasmine.createSpy('show')
    };

    await TestBed.configureTestingModule({
      imports: [TasksPageComponent, NoopAnimationsModule],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: NotificationService, useValue: mockNotificationService }
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksPageComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('doit créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('doit afficher 2 cartes Samouraï via le Signal', () => {
    const cards = fixture.debugElement.queryAll(By.css('.samurai-card'));
    expect(cards.length).toBe(2);
  });

  it('doit appliquer la classe "completed-card" si la tâche est terminée', () => {
    const cards = fixture.debugElement.queryAll(By.css('.samurai-card'));
    const secondCard = cards[1].nativeElement;
    expect(secondCard.classList).toContain('completed-card');
  });

  it('doit afficher l\'illumination (Glow) si isHighlighted est true', () => {
    const cards = fixture.debugElement.queryAll(By.css('.samurai-card'));
    const secondCard = cards[1]; 
    
    expect(secondCard.nativeElement.classList).toContain('illuminated-card');
    
    const aura = secondCard.query(By.css('.glow-aura'));
    expect(aura).toBeTruthy();
  });

  it('doit appeler addTask du service via onAddTask()', () => {
    component.newTask.title = 'Nouvelle Mission';
    component.newTask.description = 'Détails';
    
    const btnAdd = fixture.debugElement.query(By.css('.btn-hanko-large'));
    btnAdd.triggerEventHandler('click', null);

    expect(mockTaskService.addTask).toHaveBeenCalledWith('Nouvelle Mission', 'Détails');
    
    expect(component.newTask.title).toBe('');
  });

  it('ne doit PAS appeler addTask si le titre est vide', () => {
    component.newTask.title = '   '; 
    component.onAddTask();
    
    expect(mockTaskService.addTask).not.toHaveBeenCalled();
  });

  it('doit demander confirmation et appeler deleteTask', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    const deleteBtn = fixture.debugElement.query(By.css('.action-btn.red'));
    
    const mockEvent = { stopPropagation: jasmine.createSpy('stopPropagation') };
    
    deleteBtn.triggerEventHandler('click', mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(window.confirm).toHaveBeenCalled();
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(1);
  });

  it('ne doit PAS supprimer si l\'utilisateur annule la confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    const mockEvent = { stopPropagation: jasmine.createSpy('stopPropagation') };
    component.onDelete(mockEvent as any, 1);

    expect(mockTaskService.deleteTask).not.toHaveBeenCalled();
  });

  it('doit appeler toggleHighlight via onToggleHighlight', () => {
    const starBtn = fixture.debugElement.query(By.css('.action-btn.gold'));
    const mockEvent = { stopPropagation: jasmine.createSpy('stopPropagation') };
    
    starBtn.triggerEventHandler('click', mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(mockTaskService.toggleHighlight).toHaveBeenCalledWith(1);
  });
});