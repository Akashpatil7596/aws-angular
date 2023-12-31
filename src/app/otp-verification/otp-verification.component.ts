import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { AppServicesService } from '../services/app-services.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseUrl } from '../services/config.api';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, NgOtpInputModule, RouterModule],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css',
})
export class OtpVerificationComponent implements OnInit {
  otpInput: string = '';
  errMessageButton: boolean = false;

  constructor(
    private appService: AppServicesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const isExist =
      localStorage.getItem('email') || localStorage.getItem('user');

    if (!isExist) {
      this.router.navigate(['/login']);
      return;
    }

    this.toastr.info('Otp has been send to your mail', '', {
      positionClass: 'toast-top-center',
    });
  }

  ngOnDestroy() {
    this.toastr.clear();
  }

  onOtpChange(event: string) {
    this.otpInput = event;
  }

  onVerify() {
    const email = localStorage.getItem('email');
    const userId = localStorage.getItem('user');

    let baseUrl;

    let verificationPayload = {};

    if (email) {
      verificationPayload = {
        otp: this.otpInput,
        email: email,
      };

      this.appService
        .postAPI(verificationPayload, BaseUrl.otpVerificationForForgotPassword)
        .subscribe(
          (data: any) => {
            if (!data.success) {
              this.errMessageButton = true;

              this.appService.errToastMessage.update(() => data.error);
              return;
            }

            this.router.navigate(['/reset-password']);
          },
          (err) => {
            this.errMessageButton = true;

            this.appService.errToastMessage.update(() => err);
          }
        );
    } else {
      verificationPayload = {
        otp: this.otpInput,
        userId: userId,
      };

      this.appService
        .postAPI(verificationPayload, BaseUrl.otpVerification)
        .subscribe(
          (data: any) => {
            console.log(data);

            if (!data.success) {
              this.errMessageButton = true;

              this.appService.errToastMessage.update(() => data.error);
              return;
            }

            localStorage.removeItem('user');
            this.router.navigate(['/login']);
          },
          (err) => {
            this.errMessageButton = true;

            this.appService.errToastMessage.update(() => err);
          }
        );
    }
  }

  onBackToRegister() {
    localStorage.removeItem('email');
    localStorage.removeItem('user');

    this.router.navigate(['register']);
  }
}
