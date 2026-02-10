import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { NotificationService } from './notification.service';

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  isHighlighted: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private notifService = inject(NotificationService);

  private tasksSubject = new BehaviorSubject<Task[]>([
    { id: 1, title: 'Défendre le château', description: 'Mur nord', completed: false, isHighlighted: true },
    { id: 2, title: 'Méditation', description: 'Sous la cascade', completed: true, isHighlighted: false }
  ]);

  readonly tasks$ = this.tasksSubject.asObservable().pipe(
    tap(tasks => console.log(`📦 Flux Tâches : ${tasks.length} éléments`)),
    
    map(tasks => {
      return [...tasks].sort((a, b) => {
        if (a.isHighlighted && !b.isHighlighted) return -1;
        if (!a.isHighlighted && b.isHighlighted) return 1;
        
        return b.id - a.id;
      });
    })
  );

  private get currentTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  addTask(title: string, description: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      completed: false,
      isHighlighted: false
    };

    this.tasksSubject.next([...this.currentTasks, newTask]);
    
    this.notifService.show(`Mission "${title}" ajoutée !`);
  }

  deleteTask(id: number): void {
    const updatedTasks = this.currentTasks.filter(t => t.id !== id);
    this.tasksSubject.next(updatedTasks);
    
    this.notifService.show('Mission supprimée.');
  }

  toggleComplete(id: number): void {
    const updatedTasks = this.currentTasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.tasksSubject.next(updatedTasks);
  }

  toggleHighlight(id: number): void {
    const updatedTasks = this.currentTasks.map(t => 
      t.id === id ? { ...t, isHighlighted: !t.isHighlighted } : t
    );
    this.tasksSubject.next(updatedTasks);
  }

  updateTaskData(id: number, newTitle: string, newDescription: string): void {
    const updatedTasks = this.currentTasks.map(t => 
      t.id === id ? { ...t, title: newTitle, description: newDescription } : t
    );
    this.tasksSubject.next(updatedTasks);
    
    this.notifService.show('Mission mise à jour.');
  }
}