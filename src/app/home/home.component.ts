import { Component, inject } from '@angular/core';
import { TaskService } from '../core/services/task.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;

  addTask(title: string) {
    if (title.trim()) {
      this.taskService.addTask(title);
    }
  }
}