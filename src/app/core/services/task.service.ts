import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = [
    { id: 1, title: 'Apprendre Angular' },
    { id: 2, title: 'Créer TaskBoard Pro' }
  ];

  private tasksSubject = new BehaviorSubject(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string) {
    const newTask = { id: Date.now(), title };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
  }
}