import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-modern-nav',
  imports: [CommonModule],
  templateUrl: './public-modern-nav.component.html',
  styleUrls: ['./public-modern-nav.component.scss'],
})
export class PublicModernNavComponent implements OnInit {
  public openSide = false;

  constructor() {}

  ngOnInit() {}

  toggleSidebar() {
    this.openSide = !this.openSide;
  }

  closeOverlay() {
    this.openSide = false;
  }

  scrollToSection(sectionId: string) {
    this.closeOverlay();

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Calculate offset for fixed header (approximately 80px)
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  }
}
