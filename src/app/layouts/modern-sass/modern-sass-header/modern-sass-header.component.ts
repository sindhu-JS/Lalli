import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modern-sass-header',
  imports:[CommonModule],
  templateUrl: './modern-sass-header.component.html',
  styleUrls: ['./modern-sass-header.component.scss']
})
export class ModernSassHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  onRedirect(e: { preventDefault: () => void; }) {
    e.preventDefault();
    let el:any = document.getElementById('feaure');
    el.scrollIntoView({behavior: 'smooth'});
  }
}
