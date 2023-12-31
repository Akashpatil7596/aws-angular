import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { UserDataComponent } from './user-data/user-data.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { ProductMainComponent } from './product-main/product-main.component';

export const routes: Routes = [
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
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'product-list',
      },
      {
        path: 'product-list',
        component: ProductMainComponent,
      },
      {
        path: 'user-list',
        component: UserDataComponent,
      },
      {
        path: 'user-settings',
        component: UserSettingComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];
