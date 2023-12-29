import { Component, OnInit, computed, effect } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AppServicesService } from '../services/app-services.service';
import { Router, RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  navbarUserImage: any;
  constructor(
    private appService: AppServicesService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    effect(() => {
      const base64Image = appService.profilePicture();

      this.navbarUserImage = sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64,' + base64Image
      );
    });
  }

  ngOnInit(): void {}

  onLoggedOut() {
    const token = localStorage.getItem('token');
    this.appService.logoutApi(token).subscribe(
      (data: any) => {
        if (!data.success) {
          this.appService.errToastMessage.update(() => data.error);
          return;
        }
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        this.appService.errToastMessage.update(() => err);
      }
    );
  }
}
