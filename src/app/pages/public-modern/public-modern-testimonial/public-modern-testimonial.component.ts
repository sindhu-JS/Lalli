import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-public-modern-testimonial',
  imports: [CommonModule, CarouselModule],
  templateUrl: './public-modern-testimonial.component.html',
  styleUrls: ['./public-modern-testimonial.component.scss'],
})
export class PublicModernTestimonialComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  testimonials = [
    {
      name: 'JENELIA ORKID 1',
      designation: 'CEO',
      img: 'assets/images/event/testimonial/L3-1.png',
      description:
        'I need to get a business loan fast! I need to get a business loan fast! get a business.',
    },
    {
      name: 'JENELIA ORKID 2',
      designation: 'CEO',
      img: 'assets/images/event/testimonial/L3-1.png',
      description:
        'I need to get a business loan fast! I need to get a business loan fast! get a business.',
    },
    {
      name: 'JENELIA ORKID 3',
      designation: 'CEO',
      img: 'assets/images/event/testimonial/L3-1.png',
      description:
        'I need to get a business loan fast! I need to get a business loan fast! get a business.',
    },
    {
      name: 'JENELIA ORKID 4',
      designation: 'CEO',
      img: 'assets/images/event/testimonial/L3-1.png',
      description:
        'I need to get a business loan fast! I need to get a business loan fast! get a business.',
    },
    {
      name: 'JENELIA ORKID 5',
      designation: 'CEO',
      img: 'assets/images/event/testimonial/L3-1.png',
      description:
        'I need to get a business loan fast! I need to get a business loan fast! get a business.',
    },
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
