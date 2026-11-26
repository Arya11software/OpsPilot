import { Component, DestroyRef, inject, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonToolbar,
  MenuController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  clipboardOutline,
  clipboardSharp,
  homeOutline,
  homeSharp,
  locationSharp,
  personCircleOutline,
  settingsOutline,
  settingsSharp,
} from 'ionicons/icons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonApp,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonRouterOutlet,
    IonToolbar,
  ],
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private menuCtrl = inject(MenuController);
  private destroyRef = inject(DestroyRef);

  activeRoute: string = '/home';

  constructor() {
    addIcons({
      homeOutline,
      homeSharp,
      clipboardOutline,
      clipboardSharp,
      settingsOutline,
      settingsSharp,
      locationSharp,
      personCircleOutline,
    });
  }

  ngOnInit(): void {
    this.updateActiveRoute(this.router.url);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event: NavigationEnd) => {
        this.updateActiveRoute(event.urlAfterRedirects || event.url);
      });
  }

  updateActiveRoute(url: string): void {
    if (url.startsWith('/tasks')) {
      this.activeRoute = '/tasks';
    } else if (url.startsWith('/settings')) {
      this.activeRoute = '/settings';
    } else {
      this.activeRoute = '/home';
    }
  }

  async navigateTo(path: string): Promise<void> {
    await this.menuCtrl.close('main-menu');
    await this.router.navigate([path]);
  }
}
