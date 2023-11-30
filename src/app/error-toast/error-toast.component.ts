import { Component, DoCheck, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServicesService } from '../services/app-services.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-error-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-toast.component.html',

  styleUrl: './error-toast.component.css',
})
export class ErrorToastComponent implements OnInit {
  errorToastMessage!: any;

  constructor(
    private appService: AppServicesService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.appService.errorToastMessage.subscribe((message: any) => {
      this.errorToastMessage = message;
      this.toastr.error(message);
    });
  }
}
