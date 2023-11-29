import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { AppServicesService } from '../services/app-services.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, NgOtpInputModule, RouterModule],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css',
})
export class OtpVerificationComponent {
  otpInput: string = '';
  errMessageButton: boolean = false;

  constructor(private appService: AppServicesService, private router: Router) {}

  onOtpChange(event: string) {
    this.otpInput = event;
  }

  onVerify() {
    const verificationPayload = {
      otp: this.otpInput,
      userId: localStorage.getItem('user'),
    };

    this.appService.verifyOtpApi(verificationPayload).subscribe(
      (data: any) => {
        if (!data.success) {
          this.errMessageButton = true;

          this.appService.errorToastMessage.next(data.error);
          return;
        }
        localStorage.removeItem('user');
        this.router.navigate(['/auth/login']);
      },
      (err) => {
        this.errMessageButton = true;

        this.appService.errorToastMessage.next(err);
      }
    );
  }
}
