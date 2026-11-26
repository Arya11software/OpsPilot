import { Component, DestroyRef, inject, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { IonButton, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addOutline,
  clipboardOutline,
  clipboardSharp,
  homeOutline,
  homeSharp,
  locationOutline,
  locationSharp,
  settingsOutline,
  settingsSharp,
} from 'ionicons/icons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonButton, IonIcon, IonLabel],
})
export class TabsPage implements OnInit {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private toastController = inject(ToastController);

  activeTab: 'home' | 'tasks' | 'visits' | 'settings' = 'home';

  constructor() {
    addIcons({
      homeOutline,
      homeSharp,
      clipboardOutline,
      clipboardSharp,
      addOutline,
      locationOutline,
      locationSharp,
      settingsOutline,
      settingsSharp,
    });
  }

  ngOnInit(): void {
    this.updateActiveTab(this.router.url);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event: NavigationEnd) => {
        this.updateActiveTab(event.urlAfterRedirects || event.url);
      });
  }

  updateActiveTab(url: string): void {
    if (url.includes('/tasks')) {
      this.activeTab = 'tasks';
    } else if (url.includes('/settings')) {
      this.activeTab = 'settings';
    } else if (url.includes('/visits')) {
      this.activeTab = 'visits';
    } else {
      this.activeTab = 'home';
    }
  }

  onTabClick(tab: 'home' | 'tasks' | 'settings'): void {
    this.activeTab = tab;
    this.router.navigate([`/${tab}`]);
  }

  onAddClick(): void {
    this.router.navigate(['/tasks/new']);
  }

  async onVisitsClick(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Visits feature will be available in the next development stage.',
      duration: 2500,
      position: 'bottom',
      color: 'dark',
      cssClass: 'ops-action-toast',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });
    await toast.present();
  }
}
