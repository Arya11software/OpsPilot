export type TaskStatus = 'Completed' | 'In Progress' | 'Pending';

export type TaskCategory = 'store' | 'equipment' | 'safety' | 'audit';

export type StatType = 'total' | 'in-progress' | 'completed' | 'pending';

/**
 * Strongly-typed model representing an operational field task in OpsPilot.
 */
export interface Task {
  id: string;
  title: string;
  location: string;
  distance: string;
  status: TaskStatus;
  icon: string;
  category?: TaskCategory;
  assignedTo?: string;
  dueDate?: string;
  description?: string;
}

/**
 * Backwards-compatibility alias for FieldTask.
 */
export type FieldTask = Task;

/**
 * Model representing high-level task metrics displayed on the dashboard.
 */
export interface TaskOverviewStat {
  id: string;
  label: string;
  count: number;
  icon: string;
  type: StatType;
}
