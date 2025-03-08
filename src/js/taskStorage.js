import { Task } from './task';

export class TaskStorage {
   static lastUsedId = 0;

   static saveTasks(tasks) {
      const tasksData = tasks.map((task) => {
         return {
            name: task.name,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            completed: task.completed,
            projectName: task.projectName,
            id: task.id,
         };
      });

      localStorage.setItem('tasks', JSON.stringify(tasksData));
   }

   static loadTasks() {
      const tasksData = JSON.parse(localStorage.getItem('tasks') || '[]');

      if (tasksData.length > 0) {
         TaskStorage.lastUsedId = Math.max(...tasksData.map((task) => task.id));
      }

      return tasksData.map((data) => {
         return new Task(
            data.name,
            data.description,
            data.dueDate,
            data.priority,
            data.completed,
            data.projectName,
            data.id,
         );
      });
   }

   static getNewTaskId() {
      return ++TaskStorage.lastUsedId;
   }
}
