import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppServicesService } from '../services/app-services.service';
import { Router, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ErrorToastComponent } from '../error-toast/error-toast.component';
import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';
import { RegisterPageComponent } from '../register-page/register-page.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorToastComponent,
    OtpVerificationComponent,
    RegisterPageComponent,
    RouterModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private appService: AppServicesService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  onLogin(formData: any) {
    const credentials = {
      email: formData.value.email,
      password: formData.value.password,
    };

    this.appService.loginApi(credentials).subscribe(
      (data: any) => {
        if (!data.success) {
          this.appService.errorToastMessage.next(data.error);
          localStorage.removeItem('token');
          return;
        }

        this.router.navigate(['/home']);
      },
      (err) => {
        this.appService.errorToastMessage.next(err);
        console.log('err', err);
      }
    );
  }
}
