import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { VotarComponent } from './votos/votar/votar.component';
import { AnalisisComponent } from './votos/analisis/analisis.component';
import { MainComponent } from './votos/main/main.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/Votos',
    pathMatch: 'full'
  },
  {
    path: 'Votos',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'Votar',
        pathMatch: 'full'
      },
      {
        path: 'Votar',
        component: VotarComponent
      },
      {
        path: 'Analisis',
        component: AnalisisComponent
      }
    ]
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: '**',
    component: MainComponent
  }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
