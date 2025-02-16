import { Routes } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroListComponent } from './hero-list/hero-list.component';

export const routes: Routes = [
    {
        path: "heroes",
        component: HeroListComponent
    },
    {
        path: "hero/:id",
        component: HeroDetailComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent
    },
    {
        path: "**",
        redirectTo: "dashboard"
    }
  
];
