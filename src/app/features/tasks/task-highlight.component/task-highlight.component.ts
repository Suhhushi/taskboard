import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-highlight',
  standalone: true,
  template: `
    <div class="highlight-card">
      🌟 <strong>{{ title }}</strong> est prioritaire !
    </div>
  `,
  styles: [`
    .highlight-card {
      padding: 1rem;
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      color: #92400e;
      width: 100%;
      text-align: center;
    }
  `]
})
export class TaskHighlightComponent {
  @Input() title: string = '';
}