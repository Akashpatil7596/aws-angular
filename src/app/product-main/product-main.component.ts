import { Component, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServicesService } from '../services/app-services.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseUrl } from '../services/config.api';

@Component({
  selector: 'app-product-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-main.component.html',
  styleUrl: './product-main.component.css',
})
export class ProductMainComponent implements OnInit {
  productsArray: any = signal([]);
  imagePath: any;

  constructor(
    private appService: AppServicesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.appService.isVisibleSpinner.next(true);

    this.appService.getAPI(BaseUrl.productList).subscribe(
      (data) => {
        const productsArr = data.data.map((product: any) => {
          this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(
            'data:image/jpg;base64,' + product.image
          );

          product.image = this.imagePath;

          return product;
        });

        this.productsArray.update(() => productsArr);
      },
      (err) => {
        this.appService.errToastMessage.update(() => err);
      }
    );
  }
}
