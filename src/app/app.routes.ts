import { Routes } from '@angular/router';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    { path: 'get-started', component: GetStartedComponent },
    { path: 'dashboard', component: DashboardComponent, /*canActivate: [authGuard]*/ },
    { path: '', redirectTo: '/get-started', pathMatch: 'full' }
];