import { Component, OnInit } from '@angular/core';
import { TapToTopComponent } from '../../../shared/components/tap-to-top/tap-to-top.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modern-sass-footer',
  imports: [TapToTopComponent,CommonModule],
  templateUrl: './modern-sass-footer.component.html',
  styleUrls: ['./modern-sass-footer.component.scss']
})
export class ModernSassFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
