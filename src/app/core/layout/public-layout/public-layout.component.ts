import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, MenubarModule],
  template: `
    <div class="public-layout min-h-screen bg-white">
      <!-- Public Header -->
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <a routerLink="/" class="cursor-pointer">
                  <img
                    class="h-8 w-auto"
                    src="assets/images/logo/9.png"
                    alt="Company Logo"
                  />
                </a>
              </div>
            </div>

            <!-- Navigation -->
            <div class="hidden md:block">
              <p-menubar [model]="menuItems" class="public-menubar">
                <ng-template pTemplate="start">
                  <!-- Empty start template -->
                </ng-template>
                <ng-template pTemplate="end">
                  <!-- Empty end template -->
                </ng-template>
              </p-menubar>
            </div>

            <!-- CTA Buttons -->
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6 space-x-3">
                @if (authService.isAuthenticated()) {
                <a
                  [routerLink]="getDashboardRoute()"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  My Dashboard
                </a>
                } @else {
                <a
                  routerLink="/auth/login"
                  class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign in
                </a>
                <a
                  routerLink="/auth/register"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Get Started
                </a>
                }
              </div>
            </div>

            <!-- Mobile menu button -->
            <div class="md:hidden">
              <button
                (click)="toggleMobileMenu()"
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <i
                  class="pi"
                  [class.pi-bars]="!mobileMenuOpen"
                  [class.pi-times]="mobileMenuOpen"
                ></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile menu -->
        <div class="md:hidden" [class.hidden]="!mobileMenuOpen">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t">
            <button
              *ngFor="let item of menuItems"
              (click)="item.command && item.command({}); mobileMenuOpen = false"
              class="w-full text-left block px-3 py-2 rounded-md text-base font-medium transition-colors"
              [class.text-blue-600]="item.styleClass === 'active-menu-item'"
              [class.bg-blue-50]="item.styleClass === 'active-menu-item'"
              [class.text-gray-700]="item.styleClass !== 'active-menu-item'"
              [class.hover:text-gray-900]="
                item.styleClass !== 'active-menu-item'
              "
              [class.hover:bg-gray-100]="item.styleClass !== 'active-menu-item'"
            >
              <i [class]="item.icon" class="mr-2"></i>
              {{ item.label }}
            </button>
            <div class="pt-4 pb-3 border-t border-gray-200">
              <div class="flex items-center space-x-3 px-3">
                @if (authService.isAuthenticated()) {
                <a
                  [routerLink]="getDashboardRoute()"
                  class="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                  >My Dashboard</a
                >
                } @else {
                <a
                  routerLink="/auth/login"
                  class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >Sign in</a
                >
                <a
                  routerLink="/auth/register"
                  class="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                  >Get Started</a
                >
                }
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>

      <!-- Public Footer -->
      <footer class="bg-gray-900 text-white mt-auto">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="col-span-1 md:col-span-2">
              <a routerLink="/" class="cursor-pointer">
                <img
                  class="h-8 w-auto mb-4"
                  src="assets/images/logo/9.png"
                  alt="Company Logo"
                />
              </a>
              <p class="text-gray-400 mb-4 max-w-md">
                We create amazing digital experiences that help businesses grow
                and succeed in the modern world.
              </p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white"
                  ><i class="pi pi-facebook"></i
                ></a>
                <a href="#" class="text-gray-400 hover:text-white"
                  ><i class="pi pi-twitter"></i
                ></a>
                <a href="#" class="text-gray-400 hover:text-white"
                  ><i class="pi pi-linkedin"></i
                ></a>
                <a href="#" class="text-gray-400 hover:text-white"
                  ><i class="pi pi-instagram"></i
                ></a>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul class="space-y-2">
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">About</a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">Careers</a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">Press</a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">Blog</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul class="space-y-2">
                <li>
                  <a href="#" class="text-gray-400 hover:text-white"
                    >Help Center</a
                  >
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white"
                    >Contact Us</a
                  >
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">Privacy</a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">Terms</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-8 pt-8 border-t border-gray-800">
            <p class="text-gray-400 text-sm text-center">
              © 2024 Your Company, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class PublicLayoutComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  currentRoute = '';
  menuItems: MenuItem[] = [];
  mobileMenuOpen = false;

  ngOnInit() {
    this.initializeMenuItems();

    // Track route changes for active menu highlighting
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects || event.url;
        this.updateMenuActiveStates();
      });

    // Set initial route
    this.currentRoute = this.router.url;
    this.updateMenuActiveStates();
  }

  initializeMenuItems() {
    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/home']),
        styleClass: '',
      },
      {
        label: 'About',
        icon: 'pi pi-info-circle',
        command: () => this.router.navigate(['/about']),
        styleClass: '',
      },
      {
        label: 'Services',
        icon: 'pi pi-cog',
        command: () => this.router.navigate(['/services']),
        styleClass: '',
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        command: () => this.router.navigate(['/contact']),
        styleClass: '',
      },
    ];
  }

  updateMenuActiveStates() {
    this.menuItems.forEach((item) => {
      const routeMap: { [key: string]: string } = {
        Home: '/home',
        About: '/about',
        Services: '/services',
        Contact: '/contact',
      };

      const route = routeMap[item.label || ''];
      if (route && this.isActiveRoute(route)) {
        item.styleClass = 'active-menu-item';
      } else {
        item.styleClass = '';
      }
    });
  }

  isActiveRoute(route: string): boolean {
    if (route === '/home') {
      return this.currentRoute === '/' || this.currentRoute === '/home';
    }
    return this.currentRoute.startsWith(route);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  getDashboardRoute(): string {
    const user = this.authService.currentUser();
    return user?.role === 'admin' ? '/admin/dashboard' : '/app/dashboard';
  }
}
