import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicModernNavComponent } from './public-modern-nav/public-modern-nav.component';

@Component({
  selector: 'app-public-layout-modern',
  imports: [RouterOutlet, PublicModernNavComponent],
  templateUrl: './public-layout-modern.component.html',
  styleUrls: ['./public-layout-modern.component.scss'],
})
export class PublicLayoutModernComponent {}
