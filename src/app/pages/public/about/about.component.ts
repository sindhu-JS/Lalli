import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-page">
      <div class="bg-gray-50 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">About Our Company</h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              We're passionate about creating innovative solutions that help businesses thrive in the digital age.
            </p>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p class="text-lg text-gray-600 mb-6">
              To empower businesses with cutting-edge technology solutions that drive growth,
              efficiency, and innovation. We believe in creating tools that not only solve today's
              challenges but anticipate tomorrow's opportunities.
            </p>
            <p class="text-lg text-gray-600">
              Founded in 2020, we've helped over 1,000 companies transform their operations
              and achieve remarkable results through our platform.
            </p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg">
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">1000+</div>
                <div class="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600">50+</div>
                <div class="text-sm text-gray-600">Team Members</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-600">99.9%</div>
                <div class="text-sm text-gray-600">Uptime</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-orange-600">24/7</div>
                <div class="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {}