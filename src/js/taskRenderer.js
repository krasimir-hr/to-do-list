import { TaskManager } from './taskManager';
import { TaskStorage } from './taskStorage';

import { TaskListRenderer } from './taskListRenderer';

export class TaskRenderer {
   static renderTaskElement(task) {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');

      const checkBox = document.createElement('span');
      checkBox.classList.add('task--checkbox');

      const checkIcon = document.createElement('span');
      checkIcon.classList.add('material-symbols-outlined', 'check-icon');
      checkIcon.textContent = 'check';

      if (task.completed) {
         checkBox.classList.add('completed')
         checkIcon.classList.add('completed')
      }

      checkBox.addEventListener('click', () => {
         task.completed = !task.completed;

         checkBox.classList.toggle('completed')
         checkIcon.classList.toggle('completed');

         const tasks = TaskStorage.loadTasks();
         const updatedTasks = tasks.map(t =>
            t.name === task.name ? { ...t, completed: task.completed } : t
         )

         TaskStorage.saveTasks(updatedTasks);
      })

      checkBox.appendChild(checkIcon);
      taskDiv.appendChild(checkBox);

      const taskContentDiv = document.createElement('div');
      taskContentDiv.classList.add('task--content');

      // Task header
      const taskHeaderDiv = document.createElement('div');
      taskHeaderDiv.classList.add('task--header');

      // Task title
      const taskTitleDiv = document.createElement('div');
      taskTitleDiv.classList.add('task--title');
      taskTitleDiv.textContent = task.name;

      taskHeaderDiv.appendChild(taskTitleDiv);

      // Task buttons container
      const taskBtns = document.createElement('div');
      taskBtns.classList.add('task-btns');

      // Task edit button
      const taskEditBtn = document.createElement('span');
      taskEditBtn.classList.add('material-symbols-outlined', 'small');
      taskEditBtn.textContent = 'edit';

      taskBtns.appendChild(taskEditBtn);

      // Task delete button
      const taskDeleteBtn = document.createElement('span');
      taskDeleteBtn.classList.add('material-symbols-outlined', 'small');
      taskDeleteBtn.textContent = 'delete';

      taskBtns.appendChild(taskDeleteBtn);

      taskHeaderDiv.appendChild(taskBtns);

      taskContentDiv.appendChild(taskHeaderDiv);

      // Task Description
      const taskDescriptionDiv = document.createElement('div');
      taskDescriptionDiv.classList.add('task--description');
      taskDescriptionDiv.textContent = task.description;

      taskContentDiv.appendChild(taskDescriptionDiv);

      // Task footer
      const taskFooterDiv = document.createElement('div');
      taskFooterDiv.classList.add('task--footer');

      // Task date
      const taskDateDiv = document.createElement('div');
      taskDateDiv.classList.add('task--date');

      const dueDate = new Date(task.dueDate);
      const formattedDate = dueDate.toLocaleDateString('en-GB', {
         day: '2-digit',
         month: 'short',
         year: 'numeric',
      })

      const dateText = document.createTextNode(formattedDate);

      taskDateDiv.appendChild(dateText);

      taskFooterDiv.appendChild(taskDateDiv);

      // Task project
      const taskProject = document.createElement('div');
      taskProject.classList.add('task--project');

      const projectText = document.createTextNode(task.projectName);
      
      taskProject.appendChild(projectText);

      taskFooterDiv.appendChild(taskProject);

      taskContentDiv.appendChild(taskFooterDiv);

      taskDiv.appendChild(taskContentDiv);

      return taskDiv;
   }
}
