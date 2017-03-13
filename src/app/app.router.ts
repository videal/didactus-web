import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { loadChildren: 'app/home/home.module#HomeModule', path: 'home' },
  { loadChildren: 'app/task/task.module#TaskModule', path: 'task/:id' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
  routes,
  {
    useHash: true
  }
);
