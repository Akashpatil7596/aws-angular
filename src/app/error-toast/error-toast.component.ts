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
    this.errorToastMessage = computed(() => {
      const message = this.appService.errToastMessage();
      if (message.length) {
        this.toastr.error(message);
      }
      return message;
    });

    setTimeout(() => {
      this.appService.errToastMessage.update(() => '');
    }, 4000);
  }
}
