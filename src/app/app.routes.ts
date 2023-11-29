import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { UserDataComponent } from './user-data/user-data.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomePageComponent,
    children: [
      {
        path: 'user-list',
        component: UserDataComponent,
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: AuthComponent,
        pathMatch: 'full',
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
      {
        path: 'otp',
        component: OtpVerificationComponent,
      },
    ],
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];
