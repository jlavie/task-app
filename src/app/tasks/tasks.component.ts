import { Component } from '@angular/core';
import { TaskListComponent } from "./task-list/task-list.component";

@Component({
  selector: 'app-tasks',
  imports: [TaskListComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

}
