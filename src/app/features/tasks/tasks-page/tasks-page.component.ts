import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../../core/services/task.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TaskStatsComponent } from '../task-stats.component/task-stats.component';
import { TaskEditComponent, TaskData } from '../task-edit.component/task-edit.component';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [FormsModule, TaskStatsComponent, TaskEditComponent],
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPageComponent {
  private taskService = inject(TaskService);
  private notifService = inject(NotificationService);

  tasks = toSignal(this.taskService.tasks$, { initialValue: [] });
  notification = toSignal(this.notifService.message$);

  editingTask = signal<Task | null>(null);

  newTask = { title: '', description: '' };


  onAddTask(): void {
    if (!this.newTask.title.trim()) return;

    this.taskService.addTask(this.newTask.title, this.newTask.description);
    this.newTask = { title: '', description: '' };
  }

  onDelete(event: Event, id: number): void {
    event.stopPropagation();
    if (confirm('Confirmer l\'élimination de cette cible ?')) {
      this.taskService.deleteTask(id);
    }
  }

  onToggleHighlight(event: Event, id: number): void {
    event.stopPropagation();
    this.taskService.toggleHighlight(id);
  }

  onToggleComplete(id: number): void {
    this.taskService.toggleComplete(id);
  }

  onStartEdit(event: Event, task: Task): void {
    event.stopPropagation();
    this.editingTask.set(task);
  }

  onSaveEdit(data: TaskData): void {
    const currentTask = this.editingTask();
    if (currentTask) {
      this.taskService.updateTaskData(currentTask.id, data.title, data.description);
      this.closeEdit();
    }
  }

  closeEdit(): void {
    this.editingTask.set(null);
  }
}