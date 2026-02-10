import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskEditComponent } from './task-edit.component';

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('initialTitle', 'Mission Test'); 
    fixture.componentRef.setInput('initialDescription', 'Description Test');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doit copier les inputs dans les variables modifiables (ngOnInit)', () => {
    expect(component.newTitle).toBe('Mission Test');
    expect(component.newDescription).toBe('Description Test');
  });

  it('doit émettre l\'événement saveTask avec les données modifiées', () => {
    let emittedData: any = null;
    component.saveTask.subscribe(data => emittedData = data);

    component.newTitle = 'Nouveau Titre';
    component.newDescription = 'Nouvelle Desc';

    component.onSave();

    expect(emittedData).toEqual({
      title: 'Nouveau Titre',
      description: 'Nouvelle Desc'
    });
  });

  it('ne doit RIEN émettre si le titre est vide (Validation)', () => {
    let emittedData: any = null;
    component.saveTask.subscribe(data => emittedData = data);

    component.newTitle = '   '; 
    
    component.onSave();

    expect(emittedData).toBeNull();
  });

  it('doit émettre l\'événement cancel', () => {
    let isCancelled = false;
    component.cancel.subscribe(() => isCancelled = true);

    component.onCancel();

    expect(isCancelled).toBeTrue();
  });
});