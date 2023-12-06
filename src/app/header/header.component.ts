import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServicesService } from '../services/app-services.service';
import { Router, RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  navbarUserImage: any;
  constructor(
    private appService: AppServicesService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.appService.profilePicture.subscribe((data) => {
      this.navbarUserImage = this.sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64,' + data
      );
    });
  }

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
