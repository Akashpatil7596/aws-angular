import { Component, DoCheck, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServicesService } from '../services/app-services.service';

@Component({
  selector: 'app-error-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-toast.component.html',
  styleUrl: './error-toast.component.css',
})
export class ErrorToastComponent implements OnInit {
  errorToastMessage!: any;

  constructor(private appService: AppServicesService) {}
  ngOnInit(): void {
    this.appService.errorToastMessage.subscribe((data) => {
      this.errorToastMessage = data;
      setTimeout(() => {
        this.errorToastMessage = '';
      }, 5000);
    });
  }

  disableErrorToast() {
    this.errorToastMessage = '';
  }
}
