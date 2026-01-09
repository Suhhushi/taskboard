import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHighlightComponent } from './task-highlight.component';

describe('TaskHighlightComponent', () => {
  let component: TaskHighlightComponent;
  let fixture: ComponentFixture<TaskHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskHighlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
