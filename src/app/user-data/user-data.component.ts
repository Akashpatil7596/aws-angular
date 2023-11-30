import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServicesService } from '../services/app-services.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css',
})
export class UserDataComponent implements OnInit {
  userData: any = {};
  imagePath: any;

  constructor(
    private appService: AppServicesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.appService.getUserByToken(token).subscribe(
      (data: any) => {
        this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpg;base64,' + data.data.profile_picture
        );
        this.userData = data.data;
      },
      (err) => console.log('err', err)
    );
  }
}
