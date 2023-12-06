import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServicesService } from '../services/app-services.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-setting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.css',
})
export class UserSettingComponent implements OnInit {
  userData: any = {};
  imagePath: any;
  updateProfileForm!: FormGroup;
  activeMenuItem: string | null = 'home';
  isPageVisible: string = 'home';

  constructor(private appService: AppServicesService) {
    this.updateProfileForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      image: new FormControl(),
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.appService.getUserByToken(token).subscribe(
      (data: any) => {
        this.userData = data.data;

        this.updateProfileForm.patchValue({
          username: this.userData.username,
          email: this.userData.email,
          image: this.userData.profile_picture,
        });
      },
      (err) => console.log('err', err)
    );
  }

  onUpdateFormSubmit(data: any) {
    this.appService.isVisibleSpinner.next(true);

    const formData = new FormData();

    const formValue = this.updateProfileForm.value;

    const file = new File([formValue.image.data], formValue.image.name);

    formData.append('username', formValue.username);
    formData.append('email', formValue.email);
    formData.append('image', file);

    this.appService.updateUserApi(formData, this.userData._id).subscribe(
      (data: any) => {
        if (!data.success) {
          this.appService.errToastMessage.update(() => data.error);

          localStorage.removeItem('token');
          return;
        }
      },
      (err) => {
        this.appService.errToastMessage.update(() => err);
      }
    );
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];

    const allowedFileType = ['image/png', 'image/jpg', 'image/jpeg'];
    if (file && allowedFileType.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        const blob = this.dataURItoBlob(reader.result as string, file.type);
        const blobFile = new File([blob], file.name, { type: file.type });

        this.updateProfileForm.patchValue({
          image: {
            name: file.name,
            data: blobFile,
          },
        });
      };
      reader.readAsDataURL(file);
    }
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

  isVisibleList(menuItem: string) {
    this.activeMenuItem = menuItem;

    this.isPageVisible = menuItem;
  }
}
