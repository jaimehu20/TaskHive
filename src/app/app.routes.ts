import { Routes } from '@angular/router';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './services/auth/auth.guard';
import { FirstStepsComponent } from './pages/first-steps/first-steps.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskManagerComponent } from './pages/task-manager/task-manager.component';


export const routes: Routes = [
    { path: 'get-started', component: GetStartedComponent },
    { path: 'first-steps/:id', component: FirstStepsComponent, canActivate: [authGuard] },
    { path: 'dashboard/:id', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'preferences', component: PreferencesComponent, canActivate: [authGuard] },
    { path: 'task-form', component: TaskFormComponent, canActivate: [authGuard] },
    { path: 'manage-tasks', component: TaskManagerComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/get-started', pathMatch: 'full' },
];