import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  template: `
    <div class="public-layout min-h-screen bg-white">
      <!-- Public Header -->
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img
                  class="h-8 w-auto"
                  src="assets/images/logo/9.png"
                  alt="Company Logo"
                />
              </div>
            </div>

            <!-- Navigation -->
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a
                  routerLink="/home"
                  routerLinkActive="text-blue-600 border-b-2 border-blue-600"
                  class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300"
                >
                  Home
                </a>
                <a
                  routerLink="/about"
                  routerLinkActive="text-blue-600 border-b-2 border-blue-600"
                  class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300"
                >
                  About
                </a>
                <a
                  routerLink="/services"
                  routerLinkActive="text-blue-600 border-b-2 border-blue-600"
                  class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300"
                >
                  Services
                </a>
                <a
                  routerLink="/contact"
                  routerLinkActive="text-blue-600 border-b-2 border-blue-600"
                  class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300"
                >
                  Contact
                </a>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6 space-x-3">
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
              </div>
            </div>

            <!-- Mobile menu button -->
            <div class="md:hidden">
              <button
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <i class="pi pi-bars"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile menu -->
        <div class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t">
            <a
              routerLink="/home"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >Home</a
            >
            <a
              routerLink="/about"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >About</a
            >
            <a
              routerLink="/services"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >Services</a
            >
            <a
              routerLink="/contact"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >Contact</a
            >
            <div class="pt-4 pb-3 border-t border-gray-200">
              <div class="flex items-center space-x-3 px-3">
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
              <img
                class="h-8 w-auto mb-4"
                src="assets/images/logo/9.png"
                alt="Company Logo"
              />
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
export class PublicLayoutComponent {}
