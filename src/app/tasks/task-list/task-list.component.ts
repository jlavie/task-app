import { Component, computed, inject, signal } from '@angular/core';
import { LocalStorageService } from '../task.service';
import { TaskItemComponent } from "../task-item/task-item.component";
import { TaskStatus } from '../task.utils';

@Component({
  selector: 'app-task-list',
  imports: [TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  private taskService = inject(LocalStorageService);
  tasks = computed(() => this.taskService.tasksData())
  // computed sert à automatiser la mise a jour d'un signal
  // a chaque lecture de tasks, la fonction fournie par computed sera lancée

  taskStatus = Object.values(TaskStatus);
  taskStatusEntries = Object.entries(TaskStatus);

  generateTasks() {
    this.taskService.generateTasks();
  }

  clearTasks() {
    this.taskService.removeItems('tasks');
  }

  getTaskByStatus(status: string) {
    return this.tasks().filter(task => task.status === status);
  }

}
