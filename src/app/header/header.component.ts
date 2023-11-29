import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServicesService } from '../services/app-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private appService: AppServicesService, private router: Router) {}

  onLoggedOut() {
    const token = localStorage.getItem('token');
    this.appService.logoutApi(token).subscribe(
      (data: any) => {
        if (!data.success) {
          this.appService.errorToastMessage.next(data.error);
          return;
        }
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
      },
      (err) => {
        console.log('easasrr', err);
      }
    );
  }
}
