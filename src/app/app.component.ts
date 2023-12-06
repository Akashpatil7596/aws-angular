import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { AppServicesService } from './services/app-services.service';
import { AuthGuard } from './auth/auth.guard';
import { HeaderComponent } from './header/header.component';

import { ErrorToastComponent } from './error-toast/error-toast.component';
import { OtpGuard } from './otp-verification/otp-guard';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AuthComponent,
    HttpClientModule,
    HeaderComponent,
    ErrorToastComponent,
    LoadingSpinnerComponent,
  ],
  providers: [AppServicesService],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isVisibleErrorToast: any;

  constructor(private appService: AppServicesService) {}

  ngOnInit(): void {
    this.isVisibleErrorToast = computed(() => {
      const message = this.appService.errToastMessage();

      return message;
    });
  }
}
