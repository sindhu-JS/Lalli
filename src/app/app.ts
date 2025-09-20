import { Component, Renderer2, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  public url: any;
  title = 'Unice';
  private themeService = inject(ThemeService);

  constructor(private router: Router, private _renderer2: Renderer2) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  public ngOnInit() {
    let script = this._renderer2.createElement('script');
    script.src = `/assets/tilt.js`;
    this._renderer2.appendChild(document.body, script);
  }
}
