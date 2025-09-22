import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    MessageModule,
    ButtonComponent,
  ],
  template: `
    <div class="contact-page">
      <div class="bg-gray-50 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team. We'd love to hear from you.
          </p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div class="space-y-6">
              <div class="flex items-start">
                <div
                  class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1"
                >
                  <i class="pi pi-map-marker text-blue-600 text-sm"></i>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Address</h3>
                  <p class="text-gray-600">
                    123 Business Street<br />Suite 100<br />City, State 12345
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1"
                >
                  <i class="pi pi-phone text-green-600 text-sm"></i>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Phone</h3>
                  <p class="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1"
                >
                  <i class="pi pi-envelope text-purple-600 text-sm"></i>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Email</h3>
                  <p class="text-gray-600">contact@company.com</p>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1"
                >
                  <i class="pi pi-clock text-orange-600 text-sm"></i>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">
                    Business Hours
                  </h3>
                  <p class="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />Weekend: 10:00 AM -
                    4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="bg-white rounded-lg shadow-sm border p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>

            <form
              [formGroup]="contactForm"
              (ngSubmit)="onSubmit()"
              class="space-y-6"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    pInputText
                    type="text"
                    formControlName="firstName"
                    class="w-full"
                  />
                  @if (isFieldInvalid('firstName')) {
                  <p-message
                    severity="error"
                    class="mt-1"
                    text="First name is required"
                  ></p-message>
                  }
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    pInputText
                    type="text"
                    formControlName="lastName"
                    class="w-full"
                  />
                  @if (isFieldInvalid('lastName')) {
                  <p-message
                    severity="error"
                    class="mt-1"
                    text="Last name is required"
                  ></p-message>
                  }
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  pInputText
                  type="email"
                  formControlName="email"
                  class="w-full"
                />
                @if (isFieldInvalid('email')) {
                <p-message
                  severity="error"
                  class="mt-1"
                  [text]="contactForm.get('email')?.errors?.['required'] ? 'Email is required' : 'Please enter a valid email address'"
                ></p-message>
                }
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  pInputText
                  type="text"
                  formControlName="subject"
                  class="w-full"
                />
                @if (isFieldInvalid('subject')) {
                <p-message
                  severity="error"
                  class="mt-1"
                  text="Subject is required"
                ></p-message>
                }
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  pTextarea
                  formControlName="message"
                  rows="4"
                  class="w-full"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
                @if (isFieldInvalid('message')) {
                <p-message
                  severity="error"
                  class="mt-1"
                  text="Message is required"
                ></p-message>
                }
              </div>

              @if (successMessage) {
              <p-message severity="success" [text]="successMessage"></p-message>
              } @if (errorMessage) {
              <p-message severity="error" [text]="errorMessage"></p-message>
              }

              <app-button
                type="submit"
                variant="primary"
                size="lg"
                [fullWidth]="true"
                [loading]="isLoading"
                [disabled]="contactForm.invalid"
              >
                Send Message
              </app-button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  contactForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.successMessage = '';
      this.errorMessage = '';

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.successMessage =
          "Thank you for your message! We'll get back to you soon.";
        this.contactForm.reset();

        // Clear success message after 5 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      }, 1500);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
