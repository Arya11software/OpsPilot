import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created via dependency injection', () => {
    expect(service).toBeTruthy();
  });

  it('should return all 12 mock field tasks', async () => {
    const tasks = await firstValueFrom(service.getTasks());
    expect(tasks.length).toBe(12);
  });

  it('should return recent tasks limited to requested count', async () => {
    const recentTasks = await firstValueFrom(service.getRecentTasks(3));
    expect(recentTasks.length).toBe(3);
    expect(recentTasks[0].title).toBe('Site Visit – Store A');
    expect(recentTasks[1].title).toBe('Equipment Check – Pump 3');
    expect(recentTasks[2].title).toBe('Safety Inspection');
  });

  it('should correctly filter tasks by Completed status', async () => {
    const completedTasks = await firstValueFrom(service.getTasksByStatus('Completed'));
    expect(completedTasks.length).toBe(4);
    expect(completedTasks.every((t) => t.status === 'Completed')).toBe(true);
  });

  it('should correctly filter tasks by In Progress status', async () => {
    const inProgressTasks = await firstValueFrom(service.getTasksByStatus('In Progress'));
    expect(inProgressTasks.length).toBe(5);
    expect(inProgressTasks.every((t) => t.status === 'In Progress')).toBe(true);
  });

  it('should correctly filter tasks by Pending status', async () => {
    const pendingTasks = await firstValueFrom(service.getTasksByStatus('Pending'));
    expect(pendingTasks.length).toBe(3);
    expect(pendingTasks.every((t) => t.status === 'Pending')).toBe(true);
  });

  it('should compute accurate overview statistics matching dashboard requirements', async () => {
    const stats = await firstValueFrom(service.getOverviewStats());
    expect(stats.length).toBe(4);

    const totalStat = stats.find((s) => s.id === 'total');
    const inProgressStat = stats.find((s) => s.id === 'in-progress');
    const completedStat = stats.find((s) => s.id === 'completed');
    const pendingStat = stats.find((s) => s.id === 'pending');

    expect(totalStat?.count).toBe(12);
    expect(inProgressStat?.count).toBe(5);
    expect(completedStat?.count).toBe(4);
    expect(pendingStat?.count).toBe(3);
  });

  it('should find an individual task by its identifier', async () => {
    const task = await firstValueFrom(service.getTaskById('task-1'));
    expect(task).toBeDefined();
    expect(task?.title).toBe('Site Visit – Store A');
  });

  it('should add a new task and prepend it to the reactive task stream', async () => {
    const created = service.addTask({
      title: 'Routine Safety Audit',
      category: 'Audit',
      location: 'East Terminal',
      scheduledDate: '2026-11-27',
      scheduledTime: '14:30',
      description: 'Audit fire extinguisher placement and emergency lighting.',
      priority: 'High',
    });

    expect(created).toBeDefined();
    expect(created.id).toBe('task-13');
    expect(created.title).toBe('Routine Safety Audit');
    expect(created.priority).toBe('High');

    const tasks = await firstValueFrom(service.getTasks());
    expect(tasks.length).toBe(13);
    expect(tasks[0].id).toBe('task-13');
  });
});
