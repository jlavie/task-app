import { effect, Injectable, signal } from "@angular/core";
import { Task } from "./task.model";
import { TaskStatus } from "./task.utils";

@Injectable({providedIn: 'root'})
export class LocalStorageService {
    private tasks = signal<Task[]>(this.getItems('tasks'));

    get tasksData() {
        return this.tasks;
    }

    generateTasks() {
        const tasks = [
            { _id: 1, title: 'Tâche 1', done: false, status: TaskStatus.NEW },
            { _id: 2, title: 'Tâche 2', done: true, status: TaskStatus.DONE },
            { _id: 3, title: 'Tâche 3', done: false, status: TaskStatus.PENDING },
            { _id: 4, title: 'Tâche 4', done: true, status: TaskStatus.IN_PROGRESS },
            { _id: 5, title: 'Tâche 5', done: true, status: TaskStatus.DONE },
            { _id: 6, title: 'Tâche 6', done: true, status: TaskStatus.NEW }
          ];

        this.setItem(tasks);
    }

    setItem(value: any): void {
        this.tasks.set(value)
    }

    sync = effect(() => {
        localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    })

    getItems(key: string) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    removeItems(key: string) {
        this.setItem([]);
        localStorage.removeItem(key);
    }
}