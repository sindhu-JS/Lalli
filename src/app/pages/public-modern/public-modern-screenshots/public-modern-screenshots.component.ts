import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-public-modern-screenshots',
  imports: [CommonModule, CarouselModule],
  templateUrl: './public-modern-screenshots.component.html',
  styleUrls: ['./public-modern-screenshots.component.scss'],
})
export class PublicModernScreenshotsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  screenshots = [
    { img: 'assets/images/saas2/screen-shot/screen.png', alt: 'Screenshot 1' },
    { img: 'assets/images/saas2/screen-shot/screen.png', alt: 'Screenshot 2' },
    { img: 'assets/images/saas2/screen-shot/screen.png', alt: 'Screenshot 3' },
    { img: 'assets/images/saas2/screen-shot/screen.png', alt: 'Screenshot 4' },
    { img: 'assets/images/saas2/screen-shot/screen.png', alt: 'Screenshot 5' },
  ];

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
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
