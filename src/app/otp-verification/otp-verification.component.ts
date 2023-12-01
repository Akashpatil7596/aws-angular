import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { AppServicesService } from '../services/app-services.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
      baseUrl = 'api/v1/users/verify-forgot-password';

      verificationPayload = {
        otp: this.otpInput,
        email: email,
      };

      this.appService.verifyOtpApi(verificationPayload, baseUrl).subscribe(
        (data: any) => {
          if (!data.success) {
            this.errMessageButton = true;

            this.appService.errorToastMessage.next(data.error);
            return;
          }

          this.router.navigate(['/reset-password']);
        },
        (err) => {
          this.errMessageButton = true;

          this.appService.errorToastMessage.next(err);
        }
      );
    } else {
      baseUrl = 'api/v1/users/verify-user';
      verificationPayload = {
        otp: this.otpInput,
        userId: userId,
      };

      this.appService.verifyOtpApi(verificationPayload, baseUrl).subscribe(
        (data: any) => {
          console.log(data);

          if (!data.success) {
            this.errMessageButton = true;

            this.appService.errorToastMessage.next(data.error);
            return;
          }

          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        },
        (err) => {
          console.log(err);
          this.errMessageButton = true;

          this.appService.errorToastMessage.next(err);
        }
      );
    }
  }
}
