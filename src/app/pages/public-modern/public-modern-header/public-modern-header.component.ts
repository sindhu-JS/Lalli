import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-modern-header',
  imports: [CommonModule],
  templateUrl: './public-modern-header.component.html',
  styleUrls: ['./public-modern-header.component.scss'],
})
export class PublicModernHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onRedirect(e: { preventDefault: () => void }) {
    e.preventDefault();
    const el: any = document.getElementById('feaure');
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
