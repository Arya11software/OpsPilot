import { Component, DestroyRef, inject, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
  IonToolbar,
  type ViewWillEnter,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  alertCircleOutline,
  arrowBackOutline,
  calendarOutline,
  checkmarkCircleOutline,
  clipboardOutline,
  locationSharp,
  navigateOutline,
  personOutline,
  storefrontOutline,
  timeOutline,
} from 'ionicons/icons';

import type { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

// Register icons required for Task Detail
addIcons({
  arrowBackOutline,
  locationSharp,
  navigateOutline,
  timeOutline,
  calendarOutline,
  personOutline,
  clipboardOutline,
  storefrontOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
});

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonBadge,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonSpinner,
  ],
})
export class TaskDetailPage implements OnInit, ViewWillEnter {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly taskService = inject(TaskService);
  private readonly destroyRef = inject(DestroyRef);

  taskId: string | null = null;
  task: Task | null = null;
  isLoading = true;
  hasError = false;

  ngOnInit(): void {
    this.resolveAndLoadTask();
  }

  /**
   * Ionic Page Lifecycle Hook: ionViewWillEnter
   * Re-evaluates route parameters and reloads the task data upon entering the view.
   */
  ionViewWillEnter(): void {
    this.resolveAndLoadTask();
  }

  /**
   * Read the task ID from Angular route parameters (/tasks/:id)
   * and retrieve the matching task from TaskService.
   */
  private resolveAndLoadTask(): void {
    this.isLoading = true;
    this.hasError = false;

    const idFromParam = this.route.snapshot.paramMap.get('id');
    this.taskId = idFromParam;

    if (!idFromParam) {
      this.isLoading = false;
      this.hasError = true;
      this.task = null;
      return;
    }

    this.taskService
      .getTaskById(idFromParam)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (foundTask) => {
          this.isLoading = false;
          if (foundTask) {
            this.task = foundTask;
            this.hasError = false;
          } else {
            this.task = null;
            this.hasError = true;
          }
        },
        error: () => {
          this.isLoading = false;
          this.hasError = true;
          this.task = null;
        },
      });
  }

  getStatusClass(status?: string): string {
    switch (status) {
      case 'Completed':
        return 'status-completed';
      case 'In Progress':
        return 'status-in-progress';
      case 'Pending':
        return 'status-pending';
      default:
        return '';
    }
  }

  /**
   * Return to the tasks list page.
   */
  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}
