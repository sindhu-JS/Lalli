import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ModernSassNavComponent } from './modern-sass-nav/modern-sass-nav.component';
import { ModernSassBrandComponent } from './modern-sass-brand/modern-sass-brand.component';
import { ModernSassBusinessComponent } from './modern-sass-business/modern-sass-business.component';
import { ModernSassFeatureComponent } from './modern-sass-feature/modern-sass-feature.component';
import { ModernSassFooterComponent } from './modern-sass-footer/modern-sass-footer.component';
import { ModernSassHeaderComponent } from './modern-sass-header/modern-sass-header.component';
import { ModernSassServicesComponent } from './modern-sass-services/modern-sass-services.component';
import { ModernSassTestimonialComponent } from './modern-sass-testimonial/modern-sass-testimonial.component';
import { ModernSassScreenshotsComponent } from './modern-sass-screenshots/modern-sass-screenshots.component';
import { ModernSassPricingComponent } from './modern-sass-pricing/modern-sass-pricing.component';

@Component({
  selector: 'app-modern-sass',
  imports: [
    ModernSassNavComponent,
    ModernSassBrandComponent,
    ModernSassBusinessComponent,
    ModernSassFeatureComponent,
    ModernSassFooterComponent,
    ModernSassHeaderComponent,
    ModernSassServicesComponent,
    ModernSassTestimonialComponent,
    ModernSassScreenshotsComponent,
    ModernSassPricingComponent,
  ],
  templateUrl: './modern-sass.component.html',
  styleUrls: ['./modern-sass.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModernSassComponent implements OnInit {
  constructor(private route: ActivatedRoute, private title: Title) {}

  ngOnInit() {
    this.title.setTitle(this.route.snapshot.data['title']);
  }
}
