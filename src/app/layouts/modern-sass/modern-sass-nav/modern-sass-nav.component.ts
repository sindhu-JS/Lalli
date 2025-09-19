import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../shared/components/navigation/menu/menu.component';

@Component({
  selector: 'app-modern-sass-nav',
  imports: [MenuComponent],
  templateUrl: './modern-sass-nav.component.html',
  styleUrls: ['./modern-sass-nav.component.scss'],
})
export class ModernSassNavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
