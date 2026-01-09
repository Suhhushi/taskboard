import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Apprendre Angular', completed: false },
    { id: 2, title: 'Créer TaskBoard Pro', completed: false }
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string) {
    const newTask: Task = { 
      id: Date.now(), 
      title, 
      completed: false 
    };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
  }
}