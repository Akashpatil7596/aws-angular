import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppServicesService } from '../services/app-services.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseUrl } from '../services/config.api';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  resetPassswordForm!: FormGroup;

  constructor(
    private appService: AppServicesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.resetPassswordForm = new FormGroup({
      password: new FormControl(null),
      confirm_password: new FormControl(null),
    });
  }

  onSubmit(formData: any) {
    formData.value.email = localStorage.getItem('email');

    this.appService.postAPI(formData.value, BaseUrl.resetPassword).subscribe(
      (data: any) => {
        if (!data.success) {
          this.appService.errToastMessage.update(() => data.error);
          return;
        }
        this.toastr.info('Password Reset Successfully');
        localStorage.removeItem('email');
        this.router.navigate(['/login']);
      },
      (err) => {
        this.appService.errToastMessage.update(() => err);
      }
    );
  }
}
