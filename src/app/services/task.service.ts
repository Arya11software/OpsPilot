import { Injectable } from '@angular/core';
import { BehaviorSubject, map, type Observable } from 'rxjs';

import type { Task, TaskOverviewStat, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /**
   * Internal initial mock field tasks for OpsPilot operations.
   * Total: 12 tasks (Completed: 4, In Progress: 5, Pending: 3).
   */
  private readonly initialTasks: Task[] = [
    {
      id: 'task-1',
      title: 'Site Visit – Store A',
      location: 'Riverside',
      distance: '4.2 km',
      status: 'Completed',
      icon: 'storefront-outline',
      category: 'store',
    },
    {
      id: 'task-2',
      title: 'Equipment Check – Pump 3',
      location: 'Lakeside',
      distance: '6.8 km',
      status: 'In Progress',
      icon: 'clipboard-outline',
      category: 'equipment',
    },
    {
      id: 'task-3',
      title: 'Safety Inspection',
      location: 'Hillview',
      distance: '9.1 km',
      status: 'Pending',
      icon: 'clipboard-outline',
      category: 'safety',
    },
    {
      id: 'task-4',
      title: 'Warehouse Audit – Zone B',
      location: 'North Park',
      distance: '3.5 km',
      status: 'Completed',
      icon: 'clipboard-outline',
      category: 'audit',
    },
    {
      id: 'task-5',
      title: 'Generator Diagnostic',
      location: 'East Station',
      distance: '5.2 km',
      status: 'In Progress',
      icon: 'clipboard-outline',
      category: 'equipment',
    },
    {
      id: 'task-6',
      title: 'Fire Safety Verification',
      location: 'West Substation',
      distance: '11.0 km',
      status: 'Pending',
      icon: 'clipboard-outline',
      category: 'safety',
    },
    {
      id: 'task-7',
      title: 'Meter Calibration',
      location: 'Downtown Center',
      distance: '2.1 km',
      status: 'In Progress',
      icon: 'clipboard-outline',
      category: 'equipment',
    },
    {
      id: 'task-8',
      title: 'HVAC Filter Check',
      location: 'Central Depot',
      distance: '7.4 km',
      status: 'Completed',
      icon: 'clipboard-outline',
      category: 'equipment',
    },
    {
      id: 'task-9',
      title: 'Pipeline Valve Inspection',
      location: 'South Terminal',
      distance: '8.3 km',
      status: 'In Progress',
      icon: 'clipboard-outline',
      category: 'equipment',
    },
    {
      id: 'task-10',
      title: 'Emergency Alarm Test',
      location: 'Metro Yard',
      distance: '10.2 km',
      status: 'Pending',
      icon: 'clipboard-outline',
      category: 'safety',
    },
    {
      id: 'task-11',
      title: 'Solar Inverter Inspection',
      location: 'Greenfield Site',
      distance: '6.0 km',
      status: 'In Progress',
      icon: 'clipboard-outline',
      category: 'equipment',
    },
    {
      id: 'task-12',
      title: 'Fleet Vehicle Inspection',
      location: 'Logistics Center',
      distance: '4.8 km',
      status: 'Completed',
      icon: 'clipboard-outline',
      category: 'safety',
    },
  ];

  /**
   * Reactive state container for field tasks.
   */
  private readonly tasksSubject = new BehaviorSubject<Task[]>(this.initialTasks);

  /**
   * Observable stream of all field tasks.
   */
  readonly tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  /**
   * Retrieve all field tasks as an Observable stream.
   */
  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  /**
   * Retrieve the most recent field tasks up to the specified limit (defaults to 3).
   */
  getRecentTasks(limit: number = 3): Observable<Task[]> {
    return this.tasks$.pipe(map((tasks) => tasks.slice(0, limit)));
  }

  /**
   * Filter field tasks by their operational status.
   */
  getTasksByStatus(status: TaskStatus): Observable<Task[]> {
    return this.tasks$.pipe(map((tasks) => tasks.filter((task) => task.status === status)));
  }

  /**
   * Compute aggregate task statistics for the dashboard overview cards.
   */
  getOverviewStats(): Observable<TaskOverviewStat[]> {
    return this.tasks$.pipe(
      map((tasks) => {
        const total = tasks.length;
        const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
        const completed = tasks.filter((t) => t.status === 'Completed').length;
        const pending = tasks.filter((t) => t.status === 'Pending').length;

        return [
          {
            id: 'total',
            label: 'Total Tasks',
            count: total,
            icon: 'clipboard-outline',
            type: 'total',
          },
          {
            id: 'in-progress',
            label: 'In Progress',
            count: inProgress,
            icon: 'play-outline',
            type: 'in-progress',
          },
          {
            id: 'completed',
            label: 'Completed',
            count: completed,
            icon: 'checkmark-outline',
            type: 'completed',
          },
          {
            id: 'pending',
            label: 'Pending',
            count: pending,
            icon: 'alert-circle-outline',
            type: 'pending',
          },
        ];
      }),
    );
  }

  /**
   * Retrieve a specific field task by its identifier.
   */
  getTaskById(id: string): Observable<Task | undefined> {
    return this.tasks$.pipe(map((tasks) => tasks.find((task) => task.id === id)));
  }
}
