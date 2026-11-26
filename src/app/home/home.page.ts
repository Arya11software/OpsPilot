import { Component, DestroyRef, inject, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {
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
  IonToolbar,
  MenuController,
  type ViewWillEnter,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addOutline,
  alertCircleOutline,
  arrowForwardOutline,
  checkmarkOutline,
  clipboardOutline,
  homeOutline,
  homeSharp,
  locationOutline,
  locationSharp,
  menuOutline,
  notificationsOutline,
  playOutline,
  settingsOutline,
  storefrontOutline,
} from 'ionicons/icons';
import type { Observable } from 'rxjs';

import type { Task, TaskOverviewStat } from '../models/task.model';
import { TaskService } from '../services/task.service';

// Register required IonIcons
addIcons({
  menuOutline,
  notificationsOutline,
  locationSharp,
  locationOutline,
  clipboardOutline,
  playOutline,
  checkmarkOutline,
  alertCircleOutline,
  storefrontOutline,
  arrowForwardOutline,
  homeSharp,
  homeOutline,
  addOutline,
  settingsOutline,
});

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonIcon,
    IonButton,
    IonButtons,
    IonMenuButton,
  ],
})
export class HomePage implements OnInit, ViewWillEnter {
  /**
   * Injected services via Angular Dependency Injection.
   */
  private readonly taskService = inject(TaskService);
  private readonly router = inject(Router);
  private readonly menuCtrl = inject(MenuController);
  private readonly destroyRef = inject(DestroyRef);

  readonly userName = 'Arya';
  activeTab = 'home';

  /**
   * Component view state populated reactively from TaskService observables.
   */
  stats: TaskOverviewStat[] = [];
  recentTasks: Task[] = [];

  /**
   * Observable streams exposed for reactive consumers.
   */
  readonly stats$: Observable<TaskOverviewStat[]> = this.taskService.getOverviewStats();
  readonly recentTasks$: Observable<Task[]> = this.taskService.getRecentTasks(3);

  ngOnInit(): void {
    this.subscribeToTaskStreams();
  }

  /**
   * Ionic Page Lifecycle Hook: ionViewWillEnter
   * Fired when the page is about to enter and become the active view.
   * Ensures home stats and tasks are up-to-date when navigating back.
   */
  ionViewWillEnter(): void {
    this.activeTab = 'home';
    this.subscribeToTaskStreams();
  }

  private subscribeToTaskStreams(): void {
    this.stats$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((stats) => {
      this.stats = stats;
    });

    this.recentTasks$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((tasks) => {
      this.recentTasks = tasks;
    });
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
   * Navigate between major tabs using Angular Router.
   */
  onTabClick(tab: string): void {
    this.activeTab = tab;
    if (tab === 'tasks') {
      this.router.navigate(['/tasks']);
    } else if (tab === 'settings') {
      this.router.navigate(['/settings']);
    }
  }

  /**
   * Navigate to the details page of a selected task (/tasks/:id).
   */
  onTaskClick(task: Task): void {
    this.router.navigate(['/tasks', task.id]);
  }

  /**
   * Navigate to the complete task list (/tasks).
   */
  onViewAll(): void {
    this.router.navigate(['/tasks']);
  }

  onFabClick(): void {
    this.router.navigate(['/tasks']);
  }

  /**
   * Open the side navigation drawer.
   */
  openMenu(): void {
    this.menuCtrl.open('main-menu');
  }
}
