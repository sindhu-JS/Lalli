import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  template: `
    <div
      class="auth-layout min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800"
    >
      <div class="flex min-h-screen">
        <!-- Left side - Branding -->
        <div class="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div class="text-center text-white">
            <!-- Logo -->
            <div class="mb-8">
              <a
                routerLink="/"
                class="inline-block hover:opacity-80 transition-opacity cursor-pointer"
              >
                <img
                  class="h-12 w-auto mx-auto block dark:hidden"
                  src="assets/images/logo/1.png"
                  alt="Logo"
                />
                <img
                  class="h-12 w-auto mx-auto hidden dark:block"
                  src="assets/images/logo/9.png"
                  alt="Logo"
                />
              </a>
            </div>
            <h1 class="text-4xl font-bold mb-6">Welcome to Our Platform</h1>
            <p class="text-xl opacity-90 mb-8">
              Experience the power of modern web applications with our
              cutting-edge technology stack.
            </p>
            <div class="grid grid-cols-1 gap-6 max-w-md">
              <div class="flex items-center space-x-4">
                <div
                  class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                >
                  <i class="pi pi-shield text-white"></i>
                </div>
                <div class="text-left">
                  <h3 class="font-semibold">Secure</h3>
                  <p class="text-sm opacity-80">Enterprise-grade security</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div
                  class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                >
                  <i class="pi pi-send text-white"></i>
                </div>
                <div class="text-left">
                  <h3 class="font-semibold">Fast</h3>
                  <p class="text-sm opacity-80">Lightning-fast performance</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div
                  class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                >
                  <i class="pi pi-mobile text-white"></i>
                </div>
                <div class="text-left">
                  <h3 class="font-semibold">Responsive</h3>
                  <p class="text-sm opacity-80">Works on all devices</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side - Auth Form -->
        <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div class="w-full max-w-md">
            <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-xl p-8">
              <router-outlet></router-outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AuthLayoutComponent {}
