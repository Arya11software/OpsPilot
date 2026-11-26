import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { TabsPage } from './tabs.page';

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;
  let router: Router;
  let toastControllerMock: { create: ReturnType<typeof vi.fn> };
  let toastMock: { present: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    toastMock = {
      present: vi.fn().mockResolvedValue(undefined),
    };
    toastControllerMock = {
      create: vi.fn().mockResolvedValue(toastMock),
    };

    await TestBed.configureTestingModule({
      imports: [TabsPage],
      providers: [
        provideRouter([
          { path: 'home', component: class {} },
          { path: 'tasks', component: class {} },
          { path: 'settings', component: class {} },
          { path: 'tasks/new', component: class {} },
        ]),
        { provide: ToastController, useValue: toastControllerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the TabsPage component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with activeTab as home by default', () => {
    expect(component.activeTab).toBe('home');
  });

  it('should navigate to /home and update activeTab when home tab is clicked', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onTabClick('home');
    expect(component.activeTab).toBe('home');
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to /tasks and update activeTab when tasks tab is clicked', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onTabClick('tasks');
    expect(component.activeTab).toBe('tasks');
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks']);
  });

  it('should navigate to /settings and update activeTab when settings tab is clicked', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onTabClick('settings');
    expect(component.activeTab).toBe('settings');
    expect(navigateSpy).toHaveBeenCalledWith(['/settings']);
  });

  it('should correctly update activeTab on URL change', () => {
    component.updateActiveTab('/tasks');
    expect(component.activeTab).toBe('tasks');

    component.updateActiveTab('/settings');
    expect(component.activeTab).toBe('settings');

    component.updateActiveTab('/visits');
    expect(component.activeTab).toBe('visits');

    component.updateActiveTab('/home');
    expect(component.activeTab).toBe('home');
  });

  it('should navigate to /tasks/new when Add button is clicked', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onAddClick();
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks/new']);
  });

  it('should trigger onAddClick when the elevated FAB button is clicked in the DOM', () => {
    const onAddSpy = vi.spyOn(component, 'onAddClick');
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const fabButton: HTMLElement | null = fixture.nativeElement.querySelector('.elevated-fab-btn');
    expect(fabButton).toBeTruthy();
    fabButton?.click();
    expect(onAddSpy).toHaveBeenCalled();
  });

  it('should display an Ionic toast when Visits tab is clicked', async () => {
    await component.onVisitsClick();
    expect(toastControllerMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Visits feature will be available in the next development stage.',
        position: 'bottom',
      }),
    );
    expect(toastMock.present).toHaveBeenCalled();
  });
});
