import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Observable } from 'rxjs';

// Services
import { TaskService, Task } from '../../../core/services/task.service';
import { NotificationService } from '../../../core/services/notification.service';

// Composants Enfants
import { TaskStatsComponent } from '../task-stats.component/task-stats.component';
// Note : On importe aussi TaskData pour le typage
import { TaskEditComponent, TaskData } from '../task-edit.component/task-edit.component';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule, TaskStatsComponent, FormsModule, TaskEditComponent], 
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent {
  // Flux de données (Observables)
  tasks$: Observable<Task[]>;
  notification$: Observable<string | null>;

  // Objet pour le formulaire d'ajout
  newTask = {
    title: '',
    description: ''
  };

  // Tâche en cours d'édition (null = pas de modale affichée)
  editingTask: Task | null = null;

  constructor(
    private taskService: TaskService, 
    private notifService: NotificationService
  ) {
    // Connexion aux flux des services
    this.tasks$ = this.taskService.tasks$;
    this.notification$ = this.notifService.message$;
  }

  // --- ACTIONS PRINCIPALES ---

  addTask(): void {
    if (!this.newTask.title.trim()) return;
    
    this.taskService.addTask(this.newTask.title, this.newTask.description);
    
    // Reset du formulaire
    this.newTask = { title: '', description: '' };
  }

  deleteTask(id: number): void { 
    this.taskService.deleteTask(id); 
  }

  toggleComplete(id: number): void { 
    this.taskService.toggleComplete(id); 
  }
  
  toggleHighlight(id: number): void {
    this.taskService.toggleHighlight(id);
  }

  // --- GESTION DE L'ÉDITION (MODALE) ---

  // 1. Ouvre la modale en chargeant la tâche
  startEdit(task: Task): void {
    this.editingTask = task; 
  }

  // 2. Sauvegarde : Reçoit l'objet {title, description} de l'enfant
  onSaveEdit(data: TaskData): void {
    if (this.editingTask) {
      this.taskService.updateTaskData(
        this.editingTask.id, 
        data.title, 
        data.description
      );
      this.editingTask = null; // Ferme la modale
    }
  }

  // 3. Annulation
  cancelEdit(): void {
    this.editingTask = null;
  }
}