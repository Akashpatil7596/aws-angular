import { Component, DoCheck, OnInit, computed } from '@angular/core';
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
    this.errorToastMessage = this.appService.errToastMessage();

    this.toastr.error(this.errorToastMessage);

    this.appService.errToastMessage.set('');
  }
}
