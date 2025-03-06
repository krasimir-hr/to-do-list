import { TaskListRenderer } from "./taskListRenderer";
import { TaskStorage } from "./taskStorage"
import { ProjectManager } from "./projectManager";
import { isToday, parseISO } from "date-fns"

export class TaskManager {
   static addTask(projectName, task) {
      let tasks = TaskStorage.loadTasks();
      tasks.push(task);
      TaskStorage.saveTasks(tasks);

      const allProjects = ProjectManager.getProjects();

      allProjects.forEach(project => {
         if (project.name == projectName) {
            TaskListRenderer.renderProjectTasks(project);
         }
      });
   } 

   static removeTask(project, task) {
      project.tasks = project.tasks.filter(t => t !== task);
   }

   static getTodayTasks() {
      const tasks = TaskStorage.loadTasks();

      return tasks.filter(task => {
         if (!task.dueDate) return false;

         const dueDate = parseISO(task.dueDate);

         return isToday(dueDate)
      })
   }

   static getUpcomingTasks() {
      const tasks = TaskStorage.loadTasks();
      const todayMidnight = new Date();
      todayMidnight.setHours(0, 0, 0, 0);

      return tasks.filter(task => {
         const dueDate = new Date(task.dueDate);
         return dueDate >= todayMidnight;
      })
   }

   static getAllTasks() {
      return TaskStorage.loadTasks();
   }

   static getCompletedTasks() {
      const tasks = TaskStorage.loadTasks();
      return tasks.filter(task => {
         return task.completed === true;
      })
   }

   static getProjectTasks(project) {
      const allTasks = TaskStorage.loadTasks()
      return allTasks.filter(task => task.projectName === project.name);
   }
}