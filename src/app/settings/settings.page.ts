import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonNote,
  IonToggle,
  IonToolbar,
  type ViewDidEnter,
  type ViewWillEnter,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addOutline,
  checkmarkCircleOutline,
  chevronForwardOutline,
  clipboardOutline,
  helpCircleOutline,
  homeOutline,
  homeSharp,
  informationCircleOutline,
  locationOutline,
  menuOutline,
  moonOutline,
  notificationsOutline,
  personCircleOutline,
  refreshOutline,
  settingsOutline,
  settingsSharp,
  shieldCheckmarkOutline,
  speedometerOutline,
} from 'ionicons/icons';

// Register icons required for Settings page
addIcons({
  settingsOutline,
  settingsSharp,
  menuOutline,
  homeSharp,
  homeOutline,
  clipboardOutline,
  locationOutline,
  addOutline,
  personCircleOutline,
  moonOutline,
  notificationsOutline,
  refreshOutline,
  speedometerOutline,
  shieldCheckmarkOutline,
  helpCircleOutline,
  informationCircleOutline,
  chevronForwardOutline,
  checkmarkCircleOutline,
});

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonNote,
    IonToggle,
    IonIcon,
  ],
})
export class SettingsPage implements ViewWillEnter, ViewDidEnter {
  private readonly router = inject(Router);

  activeTab = 'settings';

  /**
   * Presentational state flags (non-persistent for Day 4)
   */
  isDarkMode = false;
  isNotificationsEnabled = true;
  isAutoRefreshEnabled = true;
  distanceUnit = 'Kilometers (km)';

  readonly appVersion = '0.0.1';
  readonly buildNumber = 'Day 4 Build';
  readonly userName = 'Arya Stark';
  readonly userRole = 'Field Operations Specialist';
  readonly specialistId = 'OP-4209';

  ionViewWillEnter(): void {
    // Page entering view
  }

  ionViewDidEnter(): void {
    // Page fully entered
  }

  onToggleTheme(event: CustomEvent): void {
    this.isDarkMode = event.detail.checked;
  }

  onToggleNotifications(event: CustomEvent): void {
    this.isNotificationsEnabled = event.detail.checked;
  }

  onToggleAutoRefresh(event: CustomEvent): void {
    this.isAutoRefreshEnabled = event.detail.checked;
  }

  onTabClick(tab: string): void {
    this.activeTab = tab;
    if (tab === 'home') {
      this.router.navigate(['/home']);
    } else if (tab === 'tasks') {
      this.router.navigate(['/tasks']);
    }
  }
}
