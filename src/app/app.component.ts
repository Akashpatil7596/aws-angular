import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { AppServicesService } from './services/app-services.service';
import { AuthGuard } from './auth/auth.guard';
import { HeaderComponent } from './header/header.component';
import { app } from '../../server';
import { ErrorToastComponent } from './error-toast/error-toast.component';

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
  ],
  providers: [AppServicesService, AuthGuard],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private appService: AppServicesService) {}
}
