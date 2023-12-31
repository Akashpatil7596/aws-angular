import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppServicesService } from '../services/app-services.service';
import { Router, RouterModule } from '@angular/router';
import { ErrorToastComponent } from '../error-toast/error-toast.component';
import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';
import { RegisterPageComponent } from '../register-page/register-page.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { BaseUrl } from '../services/config.api';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorToastComponent,
    OtpVerificationComponent,
    RegisterPageComponent,
    ResetPasswordComponent,
    RouterModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  @ViewChild('emailModal', { static: true })
  emailModal!: ElementRef;

  loginForm!: FormGroup;

  constructor(private appService: AppServicesService, private router: Router) {}

  ngOnInit(): void {
    const isExistToken = localStorage.getItem('token');

    if (isExistToken) {
      this.router.navigate(['/home']);
    }

    const otpPageLocalStorage =
      localStorage.getItem('user') || localStorage.getItem('email');

    if (otpPageLocalStorage) {
      this.router.navigate(['/otp']);
    }

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null),
    });
  }

  onLogin(formData: any) {
    this.appService.isVisibleSpinner.next(true);

    const payload = {
      email: formData.value.email,
      password: formData.value.password,
    };

    this.appService.postAPI(payload, BaseUrl.login).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.data.token);
        this.router.navigate(['/home']);
      },
      (err) => {
        this.appService.errToastMessage.update(() => err);
      }
    );
  }

  OnSubmitModal() {
    const payload = {
      email: this.emailModal.nativeElement.value,
    };

    this.appService.postAPI(payload, BaseUrl.forgotPassword).subscribe(
      (data: any) => {
        if (!data.success) {
          this.appService.errToastMessage.update(() => data.error);
          return;
        }
        localStorage.setItem('email', data.data.email);
        this.router.navigate(['/otp']);
      },
      (err) => {
        this.appService.errToastMessage.update(() => err);
      }
    );
  }
}
