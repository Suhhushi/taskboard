import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./features/home-page/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./features/about-page/about.component').then(m => m.AboutComponent) 
  },
  { 
    path: 'tasks', 
    loadComponent: () => import('./features/tasks/tasks-page/tasks-page.component').then(m => m.TasksPageComponent) 
  }
];