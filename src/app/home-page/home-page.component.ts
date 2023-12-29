import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { AppServicesService } from '../services/app-services.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
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
        // this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(
        //   'data:image/jpg;base64,' + data.data.profile_picture.data
        // );
        this.userData = data.data;
      },
      (err) => console.log('err', err)
    );
  }
}
