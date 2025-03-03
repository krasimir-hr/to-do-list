import '../styles.css';
import { format } from 'date-fns';

import { Project } from './project';
import { ProjectManager } from './projectManager';
import { ProjectRenderer } from './projectRenderer';


import { Task } from './task';
import { TaskManager } from './taskManager';
import { TaskListRenderer } from './taskListRenderer';

import { UIRenderer } from './UIRenderer';



const project = ProjectManager.addProject('Personal')
const project2 = ProjectManager.addProject('Work', 'work')

const task1 = new Task(
   'Complete your first task.',
   'In order to mark your task as completed, please click on the checkmark.',
   '2025-03-03',
   'Urgent'
);

const task2 = new Task(
   'Complete your first task.',
   'In order to mark your task as completed, please click on the checkmark.',
   '2025-03-06',
   'Urgent'
);

console.log(project.name);


TaskManager.addTask(project, task1);
TaskManager.addTask(project, task2);

console.log(TaskManager.getAllTasks());


const todayTasksBtn = document.getElementById('today-tasks-btn');
const upcomingTasksBtn = document.getElementById('upcoming-tasks-btn');
const completedTasksBtn = document.getElementById('completed-tasks-btn');
const allTasksBtn = document.getElementById('all-tasks-btn');

todayTasksBtn.addEventListener('click', TaskListRenderer.renderTasksForToday);
upcomingTasksBtn.addEventListener('click', TaskListRenderer.renderUpcomingTasks);
completedTasksBtn.addEventListener('click', TaskListRenderer.renderCompletedTasks);
allTasksBtn.addEventListener('click', TaskListRenderer.renderAllTasks);

const addProjectBtn = document.getElementById('add-project-btn')

addProjectBtn.addEventListener('click', UIRenderer.renderAddProjectForm)

document.addEventListener('DOMContentLoaded', () => {
   ProjectRenderer.renderProjectList();
})