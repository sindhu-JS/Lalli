import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-modern-sass-pricing',
  imports: [CarouselModule, CommonModule],
  templateUrl: './modern-sass-pricing.component.html',
  styleUrls: ['./modern-sass-pricing.component.scss'],
})
export class ModernSassPricingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  pricing = [
    {
      img: 'assets/images/yoga-img/abs-yoga.png',
      package: 'free',
      feature1: '100 MB Disk Space',
      feature2: '2 Subdomains',
      feature3: '5 Email Accounts',
      feature4: 'Webmail Support',
      price: '0',
      btn: 'More',
    },
    {
      img: 'assets/images/yoga-img/abs-yoga.png',
      package: 'Medium',
      feature1: '100 MB Disk Space',
      feature2: '2 Subdomains',
      feature3: '5 Email Accounts',
      feature4: 'Webmail Support',
      price: '49',
      btn: 'purchase',
    },
    {
      img: 'assets/images/yoga-img/abs-yoga.png',
      package: 'Business',
      feature1: '100 MB Disk Space',
      feature2: '2 Subdomains',
      feature3: '5 Email Accounts',
      feature4: 'Webmail Support',
      price: '99',
      btn: 'purchase',
    },
  ];

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '999px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
