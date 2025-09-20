import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-page">
      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Our Platform
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Experience the power of modern web applications built with cutting-edge technology.
              Join thousands of users who trust our platform for their business needs.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                routerLink="/auth/register"
                class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
              >
                Get Started Free
              </a>
              <a
                routerLink="/about"
                class="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to succeed in today's digital landscape
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="pi pi-send text-2xl text-blue-600"></i>
              </div>
              <h3 class="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p class="text-gray-600">
                Built for speed and performance. Experience blazing fast load times and smooth interactions.
              </p>
            </div>

            <div class="text-center p-6">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="pi pi-shield text-2xl text-green-600"></i>
              </div>
              <h3 class="text-xl font-semibold mb-3">Secure & Reliable</h3>
              <p class="text-gray-600">
                Enterprise-grade security with 99.9% uptime guarantee. Your data is always safe with us.
              </p>
            </div>

            <div class="text-center p-6">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="pi pi-users text-2xl text-purple-600"></i>
              </div>
              <h3 class="text-xl font-semibold mb-3">Team Collaboration</h3>
              <p class="text-gray-600">
                Work seamlessly with your team. Real-time collaboration tools built for modern workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="bg-gray-900 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join over 10,000 companies that trust our platform for their business operations.
          </p>
          <a
            routerLink="/auth/register"
            class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 transition-colors"
          >
            Start Your Free Trial
          </a>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent {}