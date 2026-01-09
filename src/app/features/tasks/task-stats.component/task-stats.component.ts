import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-stats.component.html',
  styleUrls: ['./task-stats.component.css']
})
export class TaskStatsComponent {
  stats$: Observable<any>;

  constructor(private taskService: TaskService) {
    this.stats$ = this.taskService.tasks$.pipe(
      map(tasks => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        return {
          total,
          completed,
          active: total - completed,
          percent: total > 0 ? Math.round((completed / total) * 100) : 0
        };
      })
    );
  }
}