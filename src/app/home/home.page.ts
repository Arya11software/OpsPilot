import { Component, DestroyRef, inject, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonToolbar,
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
    IonFooter,
  ],
})
export class HomePage implements OnInit {
  /**
   * Injected services via Angular Dependency Injection.
   */
  private readonly taskService = inject(TaskService);
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
    // Consume overview stats stream with automatic lifecycle-bound unsubscription
    this.stats$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((stats) => {
      this.stats = stats;
    });

    // Consume recent tasks stream with automatic lifecycle-bound unsubscription
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

  onTabClick(tab: string): void {
    this.activeTab = tab;
  }

  onTaskClick(task: Task): void {
    console.log('Selected task:', task.title);
  }

  onViewAll(): void {
    console.log('View all tasks clicked');
  }

  onFabClick(): void {
    console.log('Quick add task clicked');
  }
}
