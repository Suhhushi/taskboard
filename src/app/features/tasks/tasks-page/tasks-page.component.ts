import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { TaskHighlightComponent } from '../task-highlight.component/task-highlight.component';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css'
})
export class TasksPageComponent {
  tasks$;

  @ViewChild('highlightContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }

  addTask(title: string) {
    this.taskService.addTask(title);
  }

  highlight(task: Task) {
    this.container.clear();
    const ref = this.container.createComponent<TaskHighlightComponent>(TaskHighlightComponent);
    ref.instance.title = task.title;
  }

  onAddDefaultTask() {
    const id = Math.floor(Math.random() * 100);
    this.taskService.addTask(`Nouvelle tâche ${id}`);
  }
}