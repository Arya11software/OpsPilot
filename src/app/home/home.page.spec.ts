import { TestBed, type ComponentFixture } from '@angular/core/testing';

import { TaskService } from '../services/task.service';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let taskService: TaskService;

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('should create the home page component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject TaskService and expose observable streams', () => {
    expect(taskService).toBeTruthy();
    expect(component.stats$).toBeDefined();
    expect(component.recentTasks$).toBeDefined();
  });

  it('should render Arya in the welcome greeting', () => {
    expect(component.userName).toBe('Arya');
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.welcome-title');
    expect(titleElement?.textContent).toContain('Welcome, Arya');
  });

  it('should retrieve 4 task overview stat cards from the service', () => {
    expect(component.stats.length).toBe(4);
    const compiled = fixture.nativeElement as HTMLElement;
    const statCards = compiled.querySelectorAll('.stat-card');
    expect(statCards.length).toBe(4);
  });

  it('should list recent field tasks retrieved from the service with status chips', () => {
    expect(component.recentTasks.length).toBe(3);
    const compiled = fixture.nativeElement as HTMLElement;
    const taskItems = compiled.querySelectorAll('.task-list-item');
    expect(taskItems.length).toBe(3);
  });

  it('should update activeTab when a tab is selected', () => {
    component.onTabClick('tasks');
    expect(component.activeTab).toBe('tasks');
    component.onTabClick('home');
    expect(component.activeTab).toBe('home');
  });
});
