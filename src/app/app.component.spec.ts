import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let menuCtrl: MenuController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    menuCtrl = TestBed.inject(MenuController);
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with activeRoute as /home', () => {
    expect(component.activeRoute).toBe('/home');
  });

  it('should update activeRoute based on route url', () => {
    component.updateActiveRoute('/tasks');
    expect(component.activeRoute).toBe('/tasks');

    component.updateActiveRoute('/settings');
    expect(component.activeRoute).toBe('/settings');

    component.updateActiveRoute('/home');
    expect(component.activeRoute).toBe('/home');
  });

  it('should close the menu and navigate when navigateTo is called', async () => {
    const closeSpy = vi.spyOn(menuCtrl, 'close').mockResolvedValue(true);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    await component.navigateTo('/tasks');

    expect(closeSpy).toHaveBeenCalledWith('main-menu');
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks']);
  });
});
