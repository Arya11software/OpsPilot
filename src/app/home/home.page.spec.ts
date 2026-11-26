import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';

import { TaskService } from '../services/task.service';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let taskService: TaskService;
  let router: Router;

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    router = TestBed.inject(Router);
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

  it('should navigate to /tasks when onViewAll is clicked', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onViewAll();
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks']);
  });

  it('should navigate to /tasks/:id when onTaskClick is called', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onTaskClick(component.recentTasks[0]);
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks', 'task-1']);
  });

  it('should navigate to /tasks or /settings when respective tabs are clicked', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onTabClick('tasks');
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks']);

    component.onTabClick('settings');
    expect(navigateSpy).toHaveBeenCalledWith(['/settings']);
  });
});
