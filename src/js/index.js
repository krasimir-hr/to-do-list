import '../styles.css';
import { format } from 'date-fns';

import { Project } from './project';
import { ProjectManager } from './projectManager';
import { ProjectRenderer } from './projectRenderer';


import { Task } from './task';
import { TaskManager } from './taskManager';
import { TaskListRenderer } from './taskListRenderer';

import { UIRenderer } from './UIRenderer';


const todayTasksBtn = document.getElementById('today-tasks-btn');
const upcomingTasksBtn = document.getElementById('upcoming-tasks-btn');
const completedTasksBtn = document.getElementById('completed-tasks-btn');
const allTasksBtn = document.getElementById('all-tasks-btn');

todayTasksBtn.addEventListener('click', TaskListRenderer.renderTasksForToday);
upcomingTasksBtn.addEventListener('click', TaskListRenderer.renderUpcomingTasks);
completedTasksBtn.addEventListener('click', TaskListRenderer.renderCompletedTasks);
allTasksBtn.addEventListener('click', TaskListRenderer.renderAllTasks);

const addProjectBtn = document.getElementById('add-project-btn');
const addTaskBtn = document.getElementById('add-task-btn');


addProjectBtn.addEventListener('click', UIRenderer.renderAddProjectForm);
addTaskBtn.addEventListener('click', UIRenderer.renderAddTaskForm);

const sidebarToggle = document.getElementById('toggle-sidebar');
sidebarToggle.addEventListener('click', UIRenderer.toggleSidebar)

document.addEventListener('DOMContentLoaded', () => {
   TaskListRenderer.renderTasksForToday();
   ProjectRenderer.renderProjectList();
})

console.log(ProjectManager.getProjects());
