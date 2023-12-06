import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppServicesService } from '../services/app-services.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent implements OnInit {
  registrationForm!: FormGroup;
  userDetails: any = {};

  constructor(private appService: AppServicesService, private router: Router) {}

  ngOnInit(): void {
    const isExistOtpData =
      localStorage.getItem('email') || localStorage.getItem('user');
    const isExistToken = localStorage.getItem('token');

    if (isExistOtpData) {
      this.router.navigate(['/otp']);
      return;
    }

    if (isExistToken) {
      this.router.navigate(['/login']);
      return;
    }

    this.registrationForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirm_password: new FormControl(),
      image: new FormControl(),
    });
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];

    const allowedFileType = ['image/png', 'image/jpg', 'image/jpeg'];
    if (file && allowedFileType.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        const blob = this.dataURItoBlob(reader.result as string, file.type);
        const blobFile = new File([blob], file.name, { type: file.type });

        this.registrationForm.patchValue({
          image: {
            name: file.name,
            data: blobFile,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onRegistration() {
    const formData = new FormData();

    const formValue = this.registrationForm.value;

    const file = new File([formValue.image.data], formValue.image.name);

    formData.append('username', formValue.username);
    formData.append('email', formValue.email);
    formData.append('password', formValue.password);
    formData.append('confirm_password', formValue.confirm_password);
    formData.append('image', file);

    this.appService.registerApi(formData).subscribe(
      (data: any) => {
        if (!data.success) {
          this.appService.errToastMessage.update(() => data.error);
          return;
        }

        localStorage.setItem('user', data.data._id);
        this.router.navigate(['/otp']);
      },
      (error) => {
        this.appService.errToastMessage.update(() => error);
        console.error('Registration failed', error);
      }
    );
  }

  private dataURItoBlob(dataURI: string, fileType: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: fileType });
  }
}
