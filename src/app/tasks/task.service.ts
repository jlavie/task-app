import { effect, Injectable, signal } from "@angular/core";
import { Task } from "./task.model";

@Injectable({providedIn: 'root'})
export class LocalStorageService {
    private tasks = signal<Task[]>(this.getItems('tasks'));

    get tasksData() {
        return this.tasks;
    }

    generateTasks() {
        const tasks = [
            { _id: 1, title: 'Tâche 1', done: false },
            { _id: 2, title: 'Tâche 2', done: true }
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