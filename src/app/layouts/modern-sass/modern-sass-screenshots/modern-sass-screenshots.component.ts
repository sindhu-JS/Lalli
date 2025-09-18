import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-modern-sass-screenshots',
  imports:[CarouselModule,CommonModule],
  templateUrl: './modern-sass-screenshots.component.html',
  styleUrls: ['./modern-sass-screenshots.component.scss']
})
export class ModernSassScreenshotsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  screenshots=
  [
    {
      img:"assets/images/saas2/screen-shot/screen.png"
    },
    {
      img:"assets/images/saas2/screen-shot/screen.png"
    },
    {
      img:"assets/images/saas2/screen-shot/screen.png"
    },
    {
      img:"assets/images/saas2/screen-shot/screen.png"
    },
    {
      img:"assets/images/saas2/screen-shot/screen.png"
    },
    {
      img:"assets/images/saas2/screen-shot/screen.png"
    },
]

    screenshotscarouselOptions= {
      items: 3,
      margin: 0,
      autoHeight: true,
      nav: false,
      autoplay: false,
      center: true,
      slideSpeed: 300,
      paginationSpeed: 400,
      dots: true,
      loop: true,
      responsive: {
        0: {
          items: 1,
          margin: 10
        },
        360: {
          items: 1,
          margin: 10
        },
        1000: {
            items: 3
        }
      }
  }

}
