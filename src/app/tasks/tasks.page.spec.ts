import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';

import { TasksPage } from './tasks.page';

describe('TasksPage', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;
  let router: Router;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the TasksPage component', () => {
    expect(component).toBeTruthy();
  });

  it('should load all 12 tasks on initialization', () => {
    expect(component.allTasks.length).toBe(12);
    expect(component.displayedTasks.length).toBe(12);
  });

  it('should refresh task list on ionViewWillEnter lifecycle event', () => {
    const spy = vi.spyOn(component, 'loadTasks');
    component.ionViewWillEnter();
    expect(spy).toHaveBeenCalled();
  });

  it('should filter tasks by In Progress status', () => {
    component.onFilterChange({
      detail: { value: 'In Progress' },
    } as CustomEvent);
    expect(component.selectedFilter).toBe('In Progress');
    expect(component.displayedTasks.length).toBe(5);
    expect(component.displayedTasks.every((t) => t.status === 'In Progress')).toBe(true);
  });

  it('should navigate to task details when onTaskSelect is triggered', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onTaskSelect('task-1');
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks', 'task-1']);
  });

  it('should navigate to task create page when onCreateTask is triggered', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onCreateTask();
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks/new']);
  });

  it('should navigate to home when home tab is selected', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onTabClick('home');
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to settings when settings tab is selected', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onTabClick('settings');
    expect(navigateSpy).toHaveBeenCalledWith(['/settings']);
  });
});
