import { Component, ChangeDetectionStrategy ,computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TaskService } from '../../../core/services/task.service';

interface TaskStats {
  total: number;
  completed: number;
  active: number;
  percent: number;
}

@Component({
  selector: 'app-task-stats',
  standalone: true,
  imports: [], 
  templateUrl: './task-stats.component.html',
  styleUrls: ['./task-stats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskStatsComponent {
  private taskService = inject(TaskService);

  private tasks = toSignal(this.taskService.tasks$, { initialValue: [] });

  stats = computed<TaskStats>(() => {
    const taskList = this.tasks();
    const total = taskList.length;
    const completed = taskList.filter(t => t.completed).length;

    return {
      total,
      completed,
      active: total - completed,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  });
}