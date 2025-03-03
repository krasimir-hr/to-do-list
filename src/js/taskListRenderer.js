import { TaskManager } from "./taskManager";
import { TaskRenderer } from "./taskRenderer";

export class TaskListRenderer {
   static renderTasks(taskList, listTitle) {
      const taskContainer = document.getElementById('tasks-container');
      taskContainer.innerHTML = '';

      const titleElement = document.getElementById('list-title');
      titleElement.textContent = listTitle;

      taskList.forEach(task => {
         const taskElement = TaskRenderer.renderTaskElement(task);
         taskContainer.appendChild(taskElement);
      })
   }

   static renderTasksForToday() {
      const todayTasks = TaskManager.getTodayTasks();
      TaskListRenderer.renderTasks(todayTasks, "Today");
   }

   static renderUpcomingTasks() {
      const upcomingTasks = TaskManager.getUpcomingTasks();
      TaskListRenderer.renderTasks(upcomingTasks, "Upcoming");
   }

   static renderCompletedTasks() {
      const completedTasks = TaskManager.getCompletedTasks();
      TaskListRenderer.renderTasks(completedTasks, "Completed");
   }

   static renderAllTasks() {
      const allTasks = TaskManager.getAllTasks();
      TaskListRenderer.renderTasks(allTasks, "All your tasks");
   }

   static renderProjectTasks(project) {
      const projectTasks = TaskManager.getProjectTasks(project);
      TaskListRenderer.renderTasks(projectTasks, project.name)
   }
}

