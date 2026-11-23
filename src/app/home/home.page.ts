import { Component } from '@angular/core';
import {
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
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
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
} from 'ionicons/icons';

export interface TaskOverviewStat {
  id: string;
  label: string;
  count: number;
  icon: string;
  type: 'total' | 'in-progress' | 'completed' | 'pending';
}

export interface FieldTask {
  id: string;
  title: string;
  location: string;
  distance: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  icon: string;
}

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
export class HomePage {
  readonly userName = 'Arya';
  activeTab = 'home';

  readonly stats: TaskOverviewStat[] = [
    {
      id: 'total',
      label: 'Total Tasks',
      count: 12,
      icon: 'clipboard-outline',
      type: 'total',
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      count: 5,
      icon: 'play-outline',
      type: 'in-progress',
    },
    {
      id: 'completed',
      label: 'Completed',
      count: 4,
      icon: 'checkmark-outline',
      type: 'completed',
    },
    {
      id: 'pending',
      label: 'Pending',
      count: 3,
      icon: 'alert-circle-outline',
      type: 'pending',
    },
  ];

  readonly recentTasks: FieldTask[] = [
    {
      id: 'task-1',
      title: 'Site Visit – Store A',
      location: 'Riverside',
      distance: '4.2 km',
      status: 'Completed',
      icon: 'storefront-outline',
    },
    {
      id: 'task-2',
      title: 'Equipment Check – Pump 3',
      location: 'Lakeside',
      distance: '6.8 km',
      status: 'In Progress',
      icon: 'clipboard-outline',
    },
    {
      id: 'task-3',
      title: 'Safety Inspection',
      location: 'Hillview',
      distance: '9.1 km',
      status: 'Pending',
      icon: 'clipboard-outline',
    },
  ];

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

  onTaskClick(task: FieldTask): void {
    console.log('Selected task:', task.title);
  }

  onViewAll(): void {
    console.log('View all tasks clicked');
  }

  onFabClick(): void {
    console.log('Quick add task clicked');
  }
}
