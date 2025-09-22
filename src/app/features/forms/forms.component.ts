import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ToastService } from '../../shared/services/toast.service';

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    CheckboxModule,
    RadioButtonModule,
    MessageModule,
    ButtonModule,
    ButtonComponent,
  ],
  template: `
    <div class="forms-demo max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Dynamic Forms Demo
        </h1>
        <p class="text-gray-600">
          This demonstrates various form controls and validation patterns using
          Angular Reactive Forms.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Sample Contact Form -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Contact Form</h2>

          <form
            [formGroup]="contactForm"
            (ngSubmit)="onContactSubmit()"
            class="space-y-4"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  pInputText
                  type="text"
                  formControlName="firstName"
                  class="w-full"
                />
                @if (isContactFieldInvalid('firstName')) {
                <p-message
                  severity="error"
                  class="mt-1"
                  text="First name is required"
                ></p-message>
                }
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  pInputText
                  type="text"
                  formControlName="lastName"
                  class="w-full"
                />
                @if (isContactFieldInvalid('lastName')) {
                <p-message
                  severity="error"
                  class="mt-1"
                  text="Last name is required"
                ></p-message>
                }
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                pInputText
                type="email"
                formControlName="email"
                class="w-full"
              />
              @if (isContactFieldInvalid('email')) {
              <p-message
                severity="error"
                class="mt-1"
                [text]="contactForm.get('email')?.errors?.['required'] ? 'Email is required' : 'Please enter a valid email address'"
              ></p-message>
              }
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <p-select
                formControlName="subject"
                [options]="subjectOptions"
                placeholder="Select a subject"
                class="w-full"
              ></p-select>
              @if (isContactFieldInvalid('subject')) {
              <p-message
                severity="error"
                class="mt-1"
                text="Please select a subject"
              ></p-message>
              }
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                pTextarea
                formControlName="message"
                rows="4"
                class="w-full"
                placeholder="Please describe your inquiry..."
              ></textarea>
              @if (isContactFieldInvalid('message')) {
              <p-message
                severity="error"
                class="mt-1"
                text="Message is required"
              ></p-message>
              }
            </div>

            <div>
              <label class="flex items-start">
                <p-checkbox
                  formControlName="subscribe"
                  [binary]="true"
                  class="mt-1"
                ></p-checkbox>
                <span class="ml-2 text-sm text-gray-600">
                  Subscribe to our newsletter for updates and news
                </span>
              </label>
            </div>

            <div class="pt-4">
              <app-button
                type="submit"
                variant="primary"
                [fullWidth]="true"
                [loading]="contactLoading"
                [disabled]="contactForm.invalid"
              >
                Send Message
              </app-button>
            </div>
          </form>
        </div>

        <!-- Dynamic Form Builder -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            Dynamic Form Builder
          </h2>

          <form
            [formGroup]="dynamicForm"
            (ngSubmit)="onDynamicSubmit()"
            class="space-y-4"
          >
            @for (field of formFields; track field.name) {
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ field.label }}
                @if (field.required) { * }
              </label>

              @switch (field.type) { @case ('text') {
              <input
                pInputText
                type="text"
                [formControlName]="field.name"
                class="w-full"
              />
              } @case ('email') {
              <input
                pInputText
                type="email"
                [formControlName]="field.name"
                class="w-full"
              />
              } @case ('select') {
              <p-select
                [formControlName]="field.name"
                [options]="field.options || []"
                placeholder="Choose an option"
                optionLabel="label"
                optionValue="value"
                class="w-full"
              ></p-select>
              } @case ('textarea') {
              <textarea
                pTextarea
                [formControlName]="field.name"
                rows="3"
                class="w-full"
              ></textarea>
              } } @if (isDynamicFieldInvalid(field.name)) {
              <p-message
                severity="error"
                class="mt-1"
                [text]="field.label + ' is required'"
              ></p-message>
              }
            </div>
            }

            <div class="pt-4">
              <app-button
                type="submit"
                variant="success"
                [fullWidth]="true"
                [loading]="dynamicLoading"
                [disabled]="dynamicForm.invalid"
              >
                Submit Dynamic Form
              </app-button>
            </div>
          </form>

          <!-- Form Configuration -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Add Form Field
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <p-select
                [(ngModel)]="newFieldType"
                [options]="fieldTypeOptions"
                placeholder="Select field type"
                optionLabel="label"
                optionValue="value"
                class="text-sm"
              ></p-select>
              <app-button
                variant="secondary"
                size="sm"
                (clicked)="addFormField()"
              >
                Add Field
              </app-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Submission Results -->
      @if (lastSubmission) {
      <div class="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 class="text-lg font-medium text-green-800 mb-2">Last Submission</h3>
        <pre
          class="text-sm text-green-700 bg-green-100 p-4 rounded overflow-x-auto"
          >{{ lastSubmission | json }}</pre
        >
      </div>
      }
    </div>
  `,
})
export class FormsComponent {
  private fb = inject(FormBuilder);

  contactForm: FormGroup;
  dynamicForm: FormGroup;
  contactLoading = false;
  dynamicLoading = false;
  lastSubmission: any = null;
  newFieldType = 'text';

  subjectOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'feature', label: 'Feature Request' },
  ];

  fieldTypeOptions = [
    { value: 'text', label: 'Text Input' },
    { value: 'email', label: 'Email Input' },
    { value: 'select', label: 'Select Dropdown' },
    { value: 'textarea', label: 'Text Area' },
  ];

  formFields: FormField[] = [
    { name: 'username', label: 'Username', type: 'text', required: true },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
      ],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: false,
    },
  ];

  constructor() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      subscribe: [false],
    });

    this.dynamicForm = this.createDynamicForm();
  }

  createDynamicForm(): FormGroup {
    const group: any = {};

    this.formFields.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      if (field.type === 'email') {
        validators.push(Validators.email);
      }
      group[field.name] = ['', validators];
    });

    return this.fb.group(group);
  }

  onContactSubmit(): void {
    if (this.contactForm.valid) {
      this.contactLoading = true;

      // Simulate API call
      setTimeout(() => {
        this.lastSubmission = {
          type: 'Contact Form',
          data: this.contactForm.value,
          timestamp: new Date().toISOString(),
        };
        this.contactLoading = false;
        this.contactForm.reset();
      }, 1500);
    }
  }

  onDynamicSubmit(): void {
    if (this.dynamicForm.valid) {
      this.dynamicLoading = true;

      // Simulate API call
      setTimeout(() => {
        this.lastSubmission = {
          type: 'Dynamic Form',
          data: this.dynamicForm.value,
          timestamp: new Date().toISOString(),
        };
        this.dynamicLoading = false;
        this.dynamicForm.reset();
      }, 1500);
    }
  }

  addFormField(): void {
    const fieldName = `field_${Date.now()}`;
    const newField: FormField = {
      name: fieldName,
      label: `New ${this.newFieldType} Field`,
      type: this.newFieldType,
      required: true,
    };

    if (this.newFieldType === 'select') {
      newField.options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ];
    }

    this.formFields.push(newField);

    // Add the new field to the form
    const validators = newField.required ? [Validators.required] : [];
    if (newField.type === 'email') {
      validators.push(Validators.email);
    }

    this.dynamicForm.addControl(fieldName, this.fb.control('', validators));
  }

  isContactFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isDynamicFieldInvalid(fieldName: string): boolean {
    const field = this.dynamicForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
