import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { TaskService } from '../services/task.service';

import { TaskDetailPage } from './task-detail.page';

describe('TaskDetailPage', () => {
  let component: TaskDetailPage;
  let fixture: ComponentFixture<TaskDetailPage>;
  let router: Router;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string): string | null => (key === 'id' ? 'task-1' : null),
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailPage],
      providers: [TaskService, { provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the TaskDetailPage component', () => {
    expect(component).toBeTruthy();
  });

  it('should read task-1 from route parameters and load the task', () => {
    expect(component.taskId).toBe('task-1');
    expect(component.task).toBeTruthy();
    expect(component.task?.title).toBe('Site Visit – Store A');
    expect(component.task?.location).toBe('Riverside');
    expect(component.hasError).toBe(false);
  });

  it('should handle non-existent or invalid task IDs gracefully', () => {
    vi.spyOn(mockActivatedRoute.snapshot.paramMap, 'get').mockReturnValue('invalid-999');
    component.ionViewWillEnter();

    expect(component.task).toBeNull();
    expect(component.hasError).toBe(true);
  });

  it('should navigate back to /tasks when goBack() is called', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks']);
  });
});
