import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PublicModernBrandComponent } from './public-modern-brand/public-modern-brand.component';
import { PublicModernBusinessComponent } from './public-modern-business/public-modern-business.component';
import { PublicModernFeatureComponent } from './public-modern-feature/public-modern-feature.component';
import { PublicModernFooterComponent } from './public-modern-footer/public-modern-footer.component';
import { PublicModernHeaderComponent } from './public-modern-header/public-modern-header.component';
import { PublicModernServicesComponent } from './public-modern-services/public-modern-services.component';
import { PublicModernTestimonialComponent } from './public-modern-testimonial/public-modern-testimonial.component';
import { PublicModernScreenshotsComponent } from './public-modern-screenshots/public-modern-screenshots.component';
import { PublicModernPricingComponent } from './public-modern-pricing/public-modern-pricing.component';

@Component({
  selector: 'app-public-modern',
  imports: [
    PublicModernBrandComponent,
    PublicModernBusinessComponent,
    PublicModernFeatureComponent,
    PublicModernFooterComponent,
    PublicModernHeaderComponent,
    PublicModernServicesComponent,
    PublicModernTestimonialComponent,
    PublicModernScreenshotsComponent,
    PublicModernPricingComponent,
  ],
  templateUrl: './public-modern.component.html',
  styleUrls: ['./public-modern.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PublicModernComponent implements OnInit {
  constructor(private route: ActivatedRoute, private title: Title) {}

  ngOnInit() {
    this.title.setTitle(
      this.route.snapshot.data['title'] || 'Modern Home | Lalli'
    );
  }
}
