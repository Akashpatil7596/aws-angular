import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { UserDataComponent } from './user-data/user-data.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { RegisterPageComponent } from './register-page/register-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
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
        path: 'login',
        component: AuthComponent,
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
];
