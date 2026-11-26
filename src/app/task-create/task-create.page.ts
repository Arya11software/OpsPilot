import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTextarea,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  alertCircleOutline,
  arrowBackOutline,
  calendarOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  documentTextOutline,
  flagOutline,
  locationOutline,
  pricetagOutline,
  refreshOutline,
  timeOutline,
} from 'ionicons/icons';

import type { TaskPriority } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.page.html',
  styleUrls: ['./task-create.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton,
    IonIcon,
    IonSpinner,
  ],
})
export class TaskCreatePage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private taskService = inject(TaskService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  taskForm!: FormGroup;
  isSubmitted = false;
  isSubmitting = false;

  readonly categories = ['Site Visit', 'Inspection', 'Maintenance', 'Audit'] as const;
  readonly priorities: TaskPriority[] = ['Low', 'Medium', 'High'];

  constructor() {
    addIcons({
      arrowBackOutline,
      checkmarkCircleOutline,
      alertCircleOutline,
      refreshOutline,
      closeCircleOutline,
      addCircleOutline,
      calendarOutline,
      timeOutline,
      locationOutline,
      pricetagOutline,
      flagOutline,
      documentTextOutline,
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initialize Angular Reactive Form with robust validation rules.
   */
  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required]],
      location: ['', [Validators.required]],
      scheduledDate: ['', [Validators.required]],
      scheduledTime: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priority: ['Medium', [Validators.required]],
    });
  }

  /**
   * Determine whether a form control is invalid and should display an error message.
   */
  isFieldInvalid(fieldName: string): boolean {
    const control = this.taskForm.get(fieldName);
    if (!control) return false;
    return control.invalid && (control.touched || control.dirty || this.isSubmitted);
  }

  /**
   * Get specific localized error message for a form field.
   */
  getErrorMessage(fieldName: string): string {
    const control = this.taskForm.get(fieldName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      switch (fieldName) {
        case 'title':
          return 'Task title is required.';
        case 'category':
          return 'Please select a task category.';
        case 'location':
          return 'Location is required.';
        case 'scheduledDate':
          return 'Scheduled date is required.';
        case 'scheduledTime':
          return 'Scheduled time is required.';
        case 'description':
          return 'Description is required.';
        case 'priority':
          return 'Please select a priority.';
        default:
          return 'This field is required.';
      }
    }

    if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `${this.getFieldLabel(fieldName)} must be at least ${requiredLength} characters.`;
    }

    return 'Invalid field value.';
  }

  private getFieldLabel(fieldName: string): string {
    switch (fieldName) {
      case 'title':
        return 'Task title';
      case 'description':
        return 'Description';
      default:
        return 'Field';
    }
  }

  /**
   * Submit the reactive form, validate all controls, and add the task.
   */
  async onSubmit(): Promise<void> {
    this.isSubmitted = true;
    this.taskForm.markAllAsTouched();

    if (this.taskForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    try {
      const formValue = this.taskForm.value;
      const createdTask = this.taskService.addTask({
        title: formValue.title,
        category: formValue.category,
        location: formValue.location,
        scheduledDate: formValue.scheduledDate,
        scheduledTime: formValue.scheduledTime,
        description: formValue.description,
        priority: formValue.priority,
      });

      const toast = await this.toastController.create({
        message: `Task "${createdTask.title}" created successfully!`,
        duration: 2500,
        position: 'bottom',
        color: 'success',
        icon: 'checkmark-circle-outline',
      });
      await toast.present();

      this.taskForm.reset();
      this.isSubmitted = false;
      await this.router.navigate(['/tasks']);
    } finally {
      this.isSubmitting = false;
    }
  }

  /**
   * Cancel form editing. If form is dirty with unsaved changes, prompt confirmation alert.
   */
  async onCancel(): Promise<void> {
    if (this.taskForm.dirty) {
      const alert = await this.alertController.create({
        header: 'Discard Changes?',
        message: 'You have unsaved changes in this task. Are you sure you want to discard them?',
        cssClass: 'ops-confirm-alert',
        buttons: [
          {
            text: 'Keep Editing',
            role: 'cancel',
          },
          {
            text: 'Discard',
            role: 'destructive',
            handler: () => {
              this.router.navigate(['/tasks']);
            },
          },
        ],
      });
      await alert.present();
    } else {
      await this.router.navigate(['/tasks']);
    }
  }

  /**
   * Handle back button intercept to respect unsaved changes alert.
   */
  onBackButtonClick(event: Event): void {
    if (this.taskForm.dirty) {
      event.preventDefault();
      event.stopPropagation();
      this.onCancel();
    }
  }

  /**
   * Reset all form fields and clear validation/touched states.
   */
  async onReset(): Promise<void> {
    this.taskForm.reset({
      title: '',
      category: '',
      location: '',
      scheduledDate: '',
      scheduledTime: '',
      description: '',
      priority: 'Medium',
    });
    this.isSubmitted = false;
    this.isSubmitting = false;

    const toast = await this.toastController.create({
      message: 'Form has been reset.',
      duration: 1800,
      position: 'bottom',
      color: 'dark',
      icon: 'refresh-outline',
    });
    await toast.present();
  }
}
