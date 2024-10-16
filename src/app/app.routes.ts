import { Routes } from '@angular/router';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


export const routes: Routes = [
    { path: 'get-started', component: GetStartedComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: '/get-started', pathMatch: 'full' }
];
