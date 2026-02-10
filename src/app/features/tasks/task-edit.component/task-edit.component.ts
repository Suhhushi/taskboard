import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface TaskData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditComponent {
  initialTitle = input.required<string>();
  initialDescription = input<string>('');

  saveTask = output<TaskData>();
  cancel = output<void>();

  newTitle = '';
  newDescription = '';

  ngOnInit() {
    this.newTitle = this.initialTitle();
    this.newDescription = this.initialDescription();
  }

  onSave(): void {
    const trimmedTitle = this.newTitle.trim();
    
    if (trimmedTitle) {
      this.saveTask.emit({
        title: trimmedTitle,
        description: this.newDescription
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}