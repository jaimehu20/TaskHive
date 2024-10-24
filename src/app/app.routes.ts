import { Routes } from '@angular/router';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './services/auth/auth.guard';
import { FirstStepsComponent } from './pages/first-steps/first-steps.component';


export const routes: Routes = [
    { path: 'get-started', component: GetStartedComponent },
    { path: 'first-steps', component: FirstStepsComponent },
    { path: 'dashboard/:id', component: DashboardComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/get-started', pathMatch: 'full' }
];