import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs'; // 1. Importer tap
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
  private tasksSubject = new BehaviorSubject<Task[]>([
    { id: 1, title: 'Défendre le château', description: 'Mur nord', completed: false, isHighlighted: true },
    { id: 2, title: 'Méditation', description: 'Sous la cascade', completed: true, isHighlighted: false }
  ]);

  // 2. On insère tap() dans le pipe
  tasks$ = this.tasksSubject.asObservable().pipe(
    // tap permet de faire une action "secondaire" (log) à chaque fois que la liste change
    tap(tasks => console.log('Flux Tâches mis à jour :', tasks)),
    
    map(tasks => tasks.sort((a, b) => {
      if (a.isHighlighted && !b.isHighlighted) return -1;
      if (!a.isHighlighted && b.isHighlighted) return 1;
      return b.id - a.id;
    }))
  );

  constructor(private notifService: NotificationService) {}

  private get currentTasks() { return this.tasksSubject.value; }

  addTask(title: string, description: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      completed: false,
      isHighlighted: false
    };

    // Notification visuelle
    this.notifService.show(`Mission "${title}" ajoutée !`);
    
    // Mise à jour des données
    this.tasksSubject.next([...this.currentTasks, newTask]);
  }

  deleteTask(id: number): void {
    const updatedTasks = this.currentTasks.filter(t => t.id !== id);
    this.notifService.show('Mission supprimée.');
    this.tasksSubject.next(updatedTasks);
  }

  // ... le reste de tes méthodes (toggleComplete, updateTaskData, etc.)
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
    this.notifService.show('Mission mise à jour.');
    this.tasksSubject.next(updatedTasks);
  }
}