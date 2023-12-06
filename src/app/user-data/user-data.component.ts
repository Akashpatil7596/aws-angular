import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AppServicesService } from '../services/app-services.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserSettingComponent } from '../user-setting/user-setting.component';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    UserSettingComponent,
  ],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css',
})
export class UserDataComponent implements OnInit {
  userData: any = {};
  imagePath: any;

  constructor(
    private appService: AppServicesService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
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
