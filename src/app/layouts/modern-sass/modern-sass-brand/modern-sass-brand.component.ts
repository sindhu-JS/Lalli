import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
    selector: 'app-modern-sass-brand',
    imports: [CommonModule, CarouselModule],
    templateUrl: './modern-sass-brand.component.html',
    styleUrls: ['./modern-sass-brand.component.scss']
})
export class ModernSassBrandComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    brands = [
        { img: "assets/images/saas2/brand/1.png", alt: "Brand 1" },
        { img: "assets/images/saas2/brand/2.png", alt: "Brand 2" },
        { img: "assets/images/saas2/brand/3.png", alt: "Brand 3" },
        { img: "assets/images/saas2/brand/1.png", alt: "Brand 4" },
        { img: "assets/images/saas2/brand/5.png", alt: "Brand 5" }
    ]

    responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 5,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '479px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '359px',
            numVisible: 1,
            numScroll: 1
        }
    ];
}