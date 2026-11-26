import { Component, DestroyRef, inject, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonToolbar,
  type ViewDidEnter,
  type ViewWillEnter,
  type ViewWillLeave,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addOutline,
  arrowBackOutline,
  clipboardOutline,
  filterOutline,
  homeOutline,
  homeSharp,
  locationOutline,
  locationSharp,
  menuOutline,
  searchOutline,
  settingsOutline,
  storefrontOutline,
} from 'ionicons/icons';

import type { Task, TaskStatus } from '../models/task.model';
import { TaskService } from '../services/task.service';

// Register required icons for the Tasks page
addIcons({
  arrowBackOutline,
  clipboardOutline,
  filterOutline,
  searchOutline,
  locationSharp,
  locationOutline,
  storefrontOutline,
  homeSharp,
  homeOutline,
  addOutline,
  menuOutline,
  settingsOutline,
});

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonMenuButton,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonList,
    IonItem,
    IonBadge,
    IonIcon,
    IonCard,
    IonCardContent,
    IonButton,
    IonSpinner,
  ],
})
export class TasksPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave {
  private readonly taskService = inject(TaskService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  activeTab = 'tasks';
  selectedFilter: 'all' | TaskStatus = 'all';
  allTasks: Task[] = [];
  displayedTasks: Task[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Ionic Page Lifecycle Hook: ionViewWillEnter
   * Fired when the page is about to enter and become the active view.
   * Ideal for refreshing or refetching tasks from TaskService.
   */
  ionViewWillEnter(): void {
    this.loadTasks();
  }

  /**
   * Ionic Page Lifecycle Hook: ionViewDidEnter
   * Fired when the page has fully entered and animation has concluded.
   */
  ionViewDidEnter(): void {
    // Page fully entered
  }

  /**
   * Ionic Page Lifecycle Hook: ionViewWillLeave
   * Fired when the page is about to leave and no longer be the active page.
   */
  ionViewWillLeave(): void {
    // Cleanup if needed
  }

  /**
   * Fetch all tasks from TaskService and apply the current status filter.
   */
  loadTasks(): void {
    this.isLoading = true;
    this.taskService
      .getTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (tasks) => {
          this.allTasks = tasks;
          this.applyFilter();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  /**
   * Handle filter segment changes (All, In Progress, Pending, Completed).
   */
  onFilterChange(event: CustomEvent): void {
    this.selectedFilter = event.detail.value;
    this.applyFilter();
  }

  private applyFilter(): void {
    if (this.selectedFilter === 'all') {
      this.displayedTasks = [...this.allTasks];
    } else {
      this.displayedTasks = this.allTasks.filter((task) => task.status === this.selectedFilter);
    }
  }

  getStatusClass(status: string): string {
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
   * Navigate to the Task Details page with the route parameter /tasks/:id
   */
  onTaskSelect(taskId: string): void {
    this.router.navigate(['/tasks', taskId]);
  }

  /**
   * Navigate to the Task Creation page /tasks/new
   */
  onCreateTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  /**
   * Bottom navigation bar handler.
   */
  onTabClick(tab: string): void {
    this.activeTab = tab;
    if (tab === 'home') {
      this.router.navigate(['/home']);
    } else if (tab === 'settings') {
      this.router.navigate(['/settings']);
    }
  }
}
