import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServicesService } from '../services/app-services.service';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css',
})
export class UserDataComponent implements OnInit {
  ngOnInit(): void {}
}
