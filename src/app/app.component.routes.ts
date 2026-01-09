import { Routes } from '@angular/router';
import { HomeComponent } from './features/home-page/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'tasks', 
    loadChildren: () => import('./features/tasks/routes')
      .then(m => m.TASKS_ROUTES)
  },
  { 
    path: 'about', 
    loadChildren: () => import('./features/about-page/routes')
      .then(m => m.ABOUT_ROUTES)
  }
];