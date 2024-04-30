import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ProfileDetailsPageComponent } from './components/profile-details-page/profile-details-page.component';
import { AuthPageComponent } from './components/auth/auth-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    title: 'Authentification',
    component: AuthPageComponent
  },
  {
    path: 'home',
    title: 'Home page',
    component: HomePageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profiles'
      },
      {
        path: 'profiles',
        title: 'list of the user investment profiles',
        component: ProfilePageComponent,
      },
      {
        path: 'details/:id',
        title: 'Profile details',
        component: ProfileDetailsPageComponent
      }  
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  }
];
