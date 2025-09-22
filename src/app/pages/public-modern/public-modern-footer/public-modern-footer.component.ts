import { Component, OnInit } from '@angular/core';
import { TapToTopComponent } from '../../../shared/components/tap-to-top/tap-to-top.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-modern-footer',
  imports: [TapToTopComponent, CommonModule],
  templateUrl: './public-modern-footer.component.html',
  styleUrls: ['./public-modern-footer.component.scss'],
})
export class PublicModernFooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
