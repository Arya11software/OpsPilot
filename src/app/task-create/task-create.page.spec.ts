import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

import { TaskService } from '../services/task.service';

import { TaskCreatePage } from './task-create.page';

describe('TaskCreatePage', () => {
  let component: TaskCreatePage;
  let fixture: ComponentFixture<TaskCreatePage>;
  let router: Router;
  let taskService: TaskService;
  let toastControllerMock: { create: ReturnType<typeof vi.fn> };
  let toastMock: { present: ReturnType<typeof vi.fn> };
  let alertControllerMock: { create: ReturnType<typeof vi.fn> };
  let alertMock: { present: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    toastMock = {
      present: vi.fn().mockResolvedValue(undefined),
    };
    toastControllerMock = {
      create: vi.fn().mockResolvedValue(toastMock),
    };

    alertMock = {
      present: vi.fn().mockResolvedValue(undefined),
    };
    alertControllerMock = {
      create: vi.fn().mockResolvedValue(alertMock),
    };

    await TestBed.configureTestingModule({
      imports: [TaskCreatePage],
      providers: [
        provideRouter([{ path: 'tasks', component: class {} }]),
        { provide: ToastController, useValue: toastControllerMock },
        { provide: AlertController, useValue: alertControllerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreatePage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('should create the TaskCreatePage component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with 7 controls and default values', () => {
    expect(component.taskForm).toBeDefined();
    expect(component.taskForm.contains('title')).toBe(true);
    expect(component.taskForm.contains('category')).toBe(true);
    expect(component.taskForm.contains('location')).toBe(true);
    expect(component.taskForm.contains('scheduledDate')).toBe(true);
    expect(component.taskForm.contains('scheduledTime')).toBe(true);
    expect(component.taskForm.contains('description')).toBe(true);
    expect(component.taskForm.contains('priority')).toBe(true);

    expect(component.taskForm.get('priority')?.value).toBe('Medium');
    expect(component.taskForm.valid).toBe(false);
  });

  describe('Form Validation Rules', () => {
    it('should validate title is required and minimum 3 characters', () => {
      const titleControl = component.taskForm.get('title');

      titleControl?.setValue('');
      expect(titleControl?.hasError('required')).toBe(true);

      titleControl?.setValue('AB');
      expect(titleControl?.hasError('minlength')).toBe(true);

      titleControl?.setValue('Site Visit');
      expect(titleControl?.valid).toBe(true);
    });

    it('should validate category is required', () => {
      const catControl = component.taskForm.get('category');
      catControl?.setValue('');
      expect(catControl?.hasError('required')).toBe(true);

      catControl?.setValue('Inspection');
      expect(catControl?.valid).toBe(true);
    });

    it('should validate location is required', () => {
      const locControl = component.taskForm.get('location');
      locControl?.setValue('');
      expect(locControl?.hasError('required')).toBe(true);

      locControl?.setValue('Building 4, Sector 7');
      expect(locControl?.valid).toBe(true);
    });

    it('should validate scheduledDate and scheduledTime are required', () => {
      const dateControl = component.taskForm.get('scheduledDate');
      const timeControl = component.taskForm.get('scheduledTime');

      dateControl?.setValue('');
      timeControl?.setValue('');
      expect(dateControl?.hasError('required')).toBe(true);
      expect(timeControl?.hasError('required')).toBe(true);

      dateControl?.setValue('2026-11-28');
      timeControl?.setValue('11:00');
      expect(dateControl?.valid).toBe(true);
      expect(timeControl?.valid).toBe(true);
    });

    it('should validate description is required and minimum 10 characters', () => {
      const descControl = component.taskForm.get('description');

      descControl?.setValue('');
      expect(descControl?.hasError('required')).toBe(true);

      descControl?.setValue('Short');
      expect(descControl?.hasError('minlength')).toBe(true);

      descControl?.setValue('Complete safety perimeter verification checklist');
      expect(descControl?.valid).toBe(true);
    });

    it('should validate priority is required', () => {
      const priorityControl = component.taskForm.get('priority');
      priorityControl?.setValue('');
      expect(priorityControl?.hasError('required')).toBe(true);

      priorityControl?.setValue('High');
      expect(priorityControl?.valid).toBe(true);
    });

    it('should accurately detect invalid fields using isFieldInvalid', () => {
      const titleControl = component.taskForm.get('title');
      expect(component.isFieldInvalid('title')).toBe(false);

      titleControl?.markAsTouched();
      titleControl?.setValue('');
      expect(component.isFieldInvalid('title')).toBe(true);

      titleControl?.setValue('Valid Title');
      expect(component.isFieldInvalid('title')).toBe(false);
    });

    it('should return human-readable error messages for specific validation errors', () => {
      const titleControl = component.taskForm.get('title');
      titleControl?.setValue('');
      expect(component.getErrorMessage('title')).toBe('Task title is required.');

      titleControl?.setValue('AB');
      expect(component.getErrorMessage('title')).toBe('Task title must be at least 3 characters.');

      const descControl = component.taskForm.get('description');
      descControl?.setValue('Too short');
      expect(component.getErrorMessage('description')).toBe('Description must be at least 10 characters.');
    });
  });

  describe('Form Submission Actions', () => {
    it('should prevent submission and mark all fields as touched when form is invalid', async () => {
      const addSpy = vi.spyOn(taskService, 'addTask');
      const navigateSpy = vi.spyOn(router, 'navigate');

      await component.onSubmit();

      expect(component.isSubmitted).toBe(true);
      expect(component.taskForm.invalid).toBe(true);
      expect(component.taskForm.get('title')?.touched).toBe(true);
      expect(component.taskForm.get('category')?.touched).toBe(true);
      expect(component.taskForm.get('location')?.touched).toBe(true);
      expect(component.taskForm.get('description')?.touched).toBe(true);
      expect(addSpy).not.toHaveBeenCalled();
      expect(navigateSpy).not.toHaveBeenCalled();
    });

    it('should successfully submit valid form, add task, show toast and navigate', async () => {
      const addSpy = vi.spyOn(taskService, 'addTask');
      const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

      component.taskForm.setValue({
        title: 'Emergency Generator Audit',
        category: 'Audit',
        location: 'North Substation',
        scheduledDate: '2026-11-28',
        scheduledTime: '15:00',
        description: 'Verify emergency power transfer sequence and battery fluid levels.',
        priority: 'High',
      });

      expect(component.taskForm.valid).toBe(true);

      await component.onSubmit();

      expect(addSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Emergency Generator Audit',
          category: 'Audit',
          location: 'North Substation',
          priority: 'High',
        }),
      );
      expect(toastControllerMock.create).toHaveBeenCalledWith(
        expect.objectContaining({
          color: 'success',
        }),
      );
      expect(toastMock.present).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/tasks']);
    });
  });

  describe('Form Reset and Cancel Actions', () => {
    it('should reset all form fields and validation state on onReset()', async () => {
      component.taskForm.patchValue({
        title: 'Draft Task',
        description: 'Temporary description text',
      });
      component.taskForm.markAllAsTouched();
      component.isSubmitted = true;

      await component.onReset();

      expect(component.taskForm.get('title')?.value).toBe('');
      expect(component.taskForm.get('priority')?.value).toBe('Medium');
      expect(component.taskForm.get('title')?.touched).toBe(false);
      expect(component.isSubmitted).toBe(false);
      expect(toastControllerMock.create).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Form has been reset.',
        }),
      );
    });

    it('should navigate to /tasks directly on onCancel() when form is pristine', async () => {
      const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
      expect(component.taskForm.dirty).toBe(false);

      await component.onCancel();

      expect(alertControllerMock.create).not.toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/tasks']);
    });

    it('should prompt confirmation alert on onCancel() when form is dirty with unsaved changes', async () => {
      const navigateSpy = vi.spyOn(router, 'navigate');
      component.taskForm.get('title')?.setValue('Partially filled task');
      component.taskForm.get('title')?.markAsDirty();

      expect(component.taskForm.dirty).toBe(true);

      await component.onCancel();

      expect(alertControllerMock.create).toHaveBeenCalledWith(
        expect.objectContaining({
          header: 'Discard Changes?',
        }),
      );
      expect(alertMock.present).toHaveBeenCalled();
      expect(navigateSpy).not.toHaveBeenCalled();
    });
  });
});
