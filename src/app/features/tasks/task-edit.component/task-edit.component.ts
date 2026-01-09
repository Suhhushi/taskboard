import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Interface pour typer proprement l'événement de sortie
export interface TaskData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @Input() initialTitle: string = '';
  @Input() initialDescription: string = ''; 
  
  @Output() saveTask = new EventEmitter<TaskData>(); 
  @Output() cancel = new EventEmitter<void>();

  newTitle: string = '';
  newDescription: string = '';

  ngOnInit() {
    this.newTitle = this.initialTitle;
    this.newDescription = this.initialDescription || '';
  }

  save() {
    if (this.newTitle.trim()) {
      this.saveTask.emit({
        title: this.newTitle,
        description: this.newDescription
      });
    }
  }
}