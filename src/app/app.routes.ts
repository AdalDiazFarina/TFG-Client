import { Routes } from '@angular/router';
import { LoginPageComponent } from './views/auth/login-page/login-page.component';
import { RegisterPageComponent } from './views/auth/register-page/register-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    title: 'Authentification',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        title: 'Login a user',
        component: LoginPageComponent
      },
      {
        path: 'register',
        title: 'Register a new user',
        component: RegisterPageComponent
      }
    ]
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
        component: ProfilePageComponent
      }  
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  }
];
