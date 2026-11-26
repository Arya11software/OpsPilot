import { Injectable } from '@angular/core';
import { BehaviorSubject, map, type Observable } from 'rxjs';

import type { Task, TaskCategory, TaskOverviewStat, TaskPriority, TaskStatus } from '../models/task.model';

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
      assignedTo: 'Arya Stark',
      dueDate: 'Today, 2:00 PM',
      description:
        'Conduct full retail site operational walkthrough, review shelf replenishment, inspect POS terminals, and verify customer area safety protocols.',
    },
    {
      id: 'task-2',
      title: 'Equipment Check – Pump 3',
      location: 'Lakeside',
      distance: '6.8 km',
      status: 'In Progress',
      icon: 'clipboard-outline',
      category: 'equipment',
      assignedTo: 'Arya Stark',
      dueDate: 'Today, 4:30 PM',
      description:
        'Measure intake and discharge pressure levels, check motor vibration thresholds, and verify cooling lubricant levels on Pump 3 assembly.',
    },
    {
      id: 'task-3',
      title: 'Safety Inspection',
      location: 'Hillview',
      distance: '9.1 km',
      status: 'Pending',
      icon: 'clipboard-outline',
      category: 'safety',
      assignedTo: 'Arya Stark',
      dueDate: 'Today, 6:00 PM',
      description:
        'Perform facility walkthrough to inspect emergency exit pathways, test smoke alarm annunciators, and verify eyewash station pressure.',
    },
    {
      id: 'task-4',
      title: 'Warehouse Audit – Zone B',
      location: 'North Park',
      distance: '3.5 km',
      status: 'Completed',
      icon: 'clipboard-outline',
      category: 'audit',
      assignedTo: 'Rahul Mehta',
      dueDate: 'Yesterday, 5:00 PM',
      description:
        'Verify pallet racking integrity, audit high-value inventory bay locations, and check battery charging station ventilation.',
    },
    {
      id: 'task-5',
      title: 'Generator Diagnostic',
      location: 'East Station',
      distance: '5.2 km',
      status: 'In Progress',
      icon: 'clipboard-outline',
      category: 'equipment',
      assignedTo: 'Arya Stark',
      dueDate: 'Tomorrow, 10:00 AM',
      description:
        'Run automatic transfer switch (ATS) self-test, record battery voltage under cranking load, and inspect exhaust manifolds.',
    },
    {
      id: 'task-6',
      title: 'Fire Safety Verification',
      location: 'West Substation',
      distance: '11.0 km',
      status: 'Pending',
      icon: 'clipboard-outline',
      category: 'safety',
      assignedTo: 'Amit Kumar',
      dueDate: 'Tomorrow, 1:00 PM',
      description:
        'Inspect fire suppression system cylinder pressures, verify pull-station accessibility, and log fire door latching operation.',
    },
    {
      id: 'task-7',
      title: 'Meter Calibration',
      location: 'Downtown Center',
      distance: '2.1 km',
      status: 'In Progress',
      icon: 'clipboard-outline',
      category: 'equipment',
      assignedTo: 'Priya Sharma',
      dueDate: 'Today, 3:30 PM',
      description:
        'Calibrate electrical flow meters across the secondary distribution panel and record harmonic distortion coefficients.',
    },
    {
      id: 'task-8',
      title: 'HVAC Filter Check',
      location: 'Central Depot',
      distance: '7.4 km',
      status: 'Completed',
      icon: 'clipboard-outline',
      category: 'equipment',
      assignedTo: 'Arya Stark',
      dueDate: 'Yesterday, 3:00 PM',
      description:
        'Replace MERV-13 air filtration media on air handling unit AHU-2, check belt tension, and lubricate blower motor bearings.',
    },
    {
      id: 'task-9',
      title: 'Pipeline Valve Inspection',
      location: 'South Terminal',
      distance: '8.3 km',
      status: 'In Progress',
      icon: 'clipboard-outline',
      category: 'equipment',
      assignedTo: 'Amit Kumar',
      dueDate: 'Tomorrow, 11:30 AM',
      description:
        'Test emergency shutoff valve actuation cycle, inspect packing glands for weeping, and grease gear operator mechanisms.',
    },
    {
      id: 'task-10',
      title: 'Emergency Alarm Test',
      location: 'Metro Yard',
      distance: '10.2 km',
      status: 'Pending',
      icon: 'clipboard-outline',
      category: 'safety',
      assignedTo: 'Priya Sharma',
      dueDate: 'Tomorrow, 4:00 PM',
      description:
        'Conduct monthly perimeter horn and strobe test, verify monitoring center signal reception, and inspect tamper switches.',
    },
    {
      id: 'task-11',
      title: 'Solar Inverter Inspection',
      location: 'Greenfield Site',
      distance: '6.0 km',
      status: 'In Progress',
      icon: 'clipboard-outline',
      category: 'equipment',
      assignedTo: 'Arya Stark',
      dueDate: 'Friday, 10:00 AM',
      description:
        'Measure string DC voltages, inspect combiner box fuses, and verify AC output synchronization against grid parameters.',
    },
    {
      id: 'task-12',
      title: 'Fleet Vehicle Inspection',
      location: 'Logistics Center',
      distance: '4.8 km',
      status: 'Completed',
      icon: 'clipboard-outline',
      category: 'safety',
      assignedTo: 'Rahul Mehta',
      dueDate: 'Yesterday, 11:00 AM',
      description:
        'Inspect operational readiness of field service vehicles, check tire tread depth, test dashcam operation, and verify onboard safety kits.',
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

  /**
   * Add a new field task or visit to the reactive task list.
   */
  addTask(newTaskData: {
    title: string;
    category: string;
    location: string;
    scheduledDate: string;
    scheduledTime: string;
    description: string;
    priority: TaskPriority;
  }): Task {
    const currentTasks = this.tasksSubject.getValue();
    const newId = `task-${currentTasks.length + 1}`;

    let icon = 'clipboard-outline';
    const catLower = newTaskData.category.toLowerCase();
    let category: TaskCategory = 'safety';

    if (catLower.includes('visit') || catLower.includes('store')) {
      icon = 'storefront-outline';
      category = 'store';
    } else if (catLower.includes('inspection')) {
      icon = 'checkmark-circle-outline';
      category = 'safety';
    } else if (catLower.includes('maintenance') || catLower.includes('equipment')) {
      icon = 'construct-outline';
      category = 'equipment';
    } else if (catLower.includes('audit')) {
      icon = 'document-text-outline';
      category = 'audit';
    }

    const newTask: Task = {
      id: newId,
      title: newTaskData.title.trim(),
      location: newTaskData.location.trim(),
      distance: '1.2 km',
      status: 'Pending',
      icon,
      category,
      assignedTo: 'Arya Stark',
      dueDate: `${newTaskData.scheduledDate}, ${newTaskData.scheduledTime}`,
      description: newTaskData.description.trim(),
      priority: newTaskData.priority,
      scheduledDate: newTaskData.scheduledDate,
      scheduledTime: newTaskData.scheduledTime,
    };

    this.tasksSubject.next([newTask, ...currentTasks]);
    return newTask;
  }
}
