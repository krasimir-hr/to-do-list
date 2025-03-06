import { Task } from './task';

export class TaskStorage {
   static saveTasks(tasks) {
      const tasksData = tasks.map((task) => {
         return {
            name: task.name,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            completed: task.completed,
            projectName: task.projectName,
         };
      });

      localStorage.setItem('tasks', JSON.stringify(tasksData));
   }

   static loadTasks() {
      const tasksData = JSON.parse(localStorage.getItem('tasks') || '[]');

      return tasksData.map((data) => {
         return new Task(
            data.name,
            data.description,
            data.dueDate,
            data.priority,
            data.completed,
            data.projectName
         );
      });
   }
}
