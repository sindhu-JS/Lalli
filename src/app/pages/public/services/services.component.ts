import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="services-page">
      <div class="bg-gray-50 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions to help your business grow and succeed
          </p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (service of services; track service.id) {
            <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <i [class]="service.icon + ' text-white text-xl'"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ service.title }}</h3>
              <p class="text-gray-600 mb-4">{{ service.description }}</p>
              <ul class="space-y-2">
                @for (feature of service.features; track feature) {
                  <li class="flex items-center text-sm text-gray-500">
                    <i class="pi pi-check text-green-500 mr-2"></i>
                    {{ feature }}
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class ServicesComponent {
  services = [
    {
      id: 1,
      title: 'Web Development',
      icon: 'pi pi-code',
      description: 'Custom web applications built with modern technologies and best practices.',
      features: ['Responsive Design', 'Performance Optimized', 'SEO Friendly', 'Cross-browser Compatible']
    },
    {
      id: 2,
      title: 'Mobile Apps',
      icon: 'pi pi-mobile',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: ['Native Performance', 'Push Notifications', 'Offline Support', 'App Store Deployment']
    },
    {
      id: 3,
      title: 'Cloud Solutions',
      icon: 'pi pi-cloud',
      description: 'Scalable cloud infrastructure and deployment solutions.',
      features: ['Auto Scaling', 'Load Balancing', 'Backup & Recovery', '99.9% Uptime']
    },
    {
      id: 4,
      title: 'API Development',
      icon: 'pi pi-link',
      description: 'RESTful APIs and microservices architecture for seamless integrations.',
      features: ['RESTful Design', 'Authentication', 'Rate Limiting', 'Documentation']
    },
    {
      id: 5,
      title: 'Database Design',
      icon: 'pi pi-database',
      description: 'Optimized database architecture and data modeling for your applications.',
      features: ['Performance Tuning', 'Data Migration', 'Backup Strategies', 'Security']
    },
    {
      id: 6,
      title: 'DevOps',
      icon: 'pi pi-cog',
      description: 'CI/CD pipelines, containerization, and infrastructure automation.',
      features: ['Docker & Kubernetes', 'CI/CD Pipelines', 'Monitoring', 'Infrastructure as Code']
    }
  ];
}