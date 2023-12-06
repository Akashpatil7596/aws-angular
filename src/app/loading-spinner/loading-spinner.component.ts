import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServicesService } from '../services/app-services.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css',
})
export class LoadingSpinnerComponent implements OnInit {
  isVisibleSpinner: boolean = true;

  constructor(private appService: AppServicesService) {}

  ngOnInit(): void {
    this.appService.isVisibleSpinner.subscribe(
      (value) => (this.isVisibleSpinner = value)
    );
  }
}
