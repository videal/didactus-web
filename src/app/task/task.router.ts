import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TaskComponent } from './task.component';

const routes: Route[] = [
  {
    path: '',
    component: TaskComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
