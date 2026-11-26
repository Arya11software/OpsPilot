import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'tasks',
        loadComponent: () => import('./tasks/tasks.page').then((m) => m.TasksPage),
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'tasks/new',
    loadComponent: () => import('./task-create/task-create.page').then((m) => m.TaskCreatePage),
  },
  {
    path: 'create-task',
    redirectTo: 'tasks/new',
    pathMatch: 'full',
  },
  {
    path: 'tasks/:id',
    loadComponent: () => import('./task-detail/task-detail.page').then((m) => m.TaskDetailPage),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
