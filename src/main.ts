/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Configure PrimeNG Theme
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

const appConfigWithTheme = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: '.p-dark',
          cssLayer: false
        }
      }
    })
  ]
};

bootstrapApplication(App, appConfigWithTheme).catch((err) => console.error(err));
