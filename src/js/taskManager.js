import { TaskStorage } from "./taskStorage"
import { ProjectStorage } from "./projectStorage";
import { isToday, parseISO } from "date-fns"

export class TaskManager {
   static tasks = TaskStorage.loadTasks();

   static addTask(project, task) {
      task.projectName = project.name;
      this.tasks.push(task);
      TaskStorage.saveTasks(this.tasks);
   } 

   static removeTask(project, task) {
      project.tasks = project.tasks.filter(t => t !== task);
   }

   static getTodayTasks() {
      return this.tasks.filter(task => {
         const dueDate = parseISO(task.dueDate);
         return isToday(dueDate)
      })
   }

   static getUpcomingTasks() {
      const todayMidnight = new Date();
      todayMidnight.setHours(0, 0, 0, 0);

      return this.tasks.filter(task => {
         const dueDate = new Date(task.dueDate);
         return dueDate >= todayMidnight;
      })
   }

   static getAllTasks() {
      return this.tasks;
   }

   static getCompletedTasks() {
      return this.tasks.filter(task => {
         return task.completed === true;
      })
   }

   static getProjectTasks(project) {
      const allTasks = TaskStorage.loadTasks()
      return allTasks.filter(task => task.projectName === project.name);
   }
}