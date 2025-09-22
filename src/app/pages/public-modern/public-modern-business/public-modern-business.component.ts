import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-modern-business',
  imports: [CommonModule],
  templateUrl: './public-modern-business.component.html',
  styleUrls: ['./public-modern-business.component.scss'],
})
export class PublicModernBusinessComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  business = [
    {
      title: 'Beautiful Interface Layout',
      description:
        'Lorem Ipsum is simply dummy text of the print- ing and typesetting industry.',
    },
    {
      title: 'Beautiful Interface Layout',
      description:
        'Lorem Ipsum is simply dummy text of the print- ing and typesetting industry.',
    },
    {
      title: 'Beautiful Interface Layout',
      description:
        'Lorem Ipsum is simply dummy text of the print- ing and typesetting industry.',
    },
  ];
}
