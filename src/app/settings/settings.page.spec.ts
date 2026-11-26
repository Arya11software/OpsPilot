import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';

import { SettingsPage } from './settings.page';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;
  let router: Router;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the SettingsPage component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Arya Stark user details in profile card', () => {
    expect(component.userName).toBe('Arya Stark');
    expect(component.specialistId).toBe('OP-4209');
  });

  it('should update preference states on toggle changes', () => {
    component.onToggleTheme({ detail: { checked: true } } as CustomEvent);
    expect(component.isDarkMode).toBe(true);

    component.onToggleNotifications({
      detail: { checked: false },
    } as CustomEvent);
    expect(component.isNotificationsEnabled).toBe(false);

    component.onToggleAutoRefresh({
      detail: { checked: false },
    } as CustomEvent);
    expect(component.isAutoRefreshEnabled).toBe(false);
  });

  it('should navigate to home when home tab is selected', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onTabClick('home');
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to tasks when tasks tab is selected', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onTabClick('tasks');
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks']);
  });
});
