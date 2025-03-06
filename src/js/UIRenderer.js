import { ProjectManager } from './projectManager';
import { ProjectRenderer } from './projectRenderer';
import { TaskManager } from './taskManager';
import { TaskListRenderer } from './taskListRenderer';
import { Task } from './task';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export class UIRenderer {
   static toggleSidebar() {
      const sidebar = document.querySelector('aside');
      sidebar.classList.toggle('show');

      const pageContainer = document.querySelector('.header-main-container');
      pageContainer.classList.toggle('strech-to-fullscren');

      const sidebarContent = document.querySelector('.sidebar-content');
      sidebarContent.classList.toggle('show');

      const menuItems = document.querySelectorAll('.nav-item a');
      const activeMenuItem = document.querySelector('.active');

      menuItems.forEach((el) => {
         if (el !== activeMenuItem) {
            el.classList.toggle('show');
         }
      });

      activeMenuItem.classList.toggle('show');

      const addProjectBtn = document.getElementById('add-project-btn');
      addProjectBtn.classList.toggle('show');
   }

   static renderCurrentlyOpenedMenuItem() {
      const currentProject = document.querySelector('.project-name');
      const menuItems = document.querySelectorAll('.menu-item');

      menuItems.forEach((el) => {
         el.closest('a').classList.remove('active');
         if (currentProject.textContent === el.textContent) {
            el.closest('a').classList.add('active');
         }
      });
   }

   static renderAddProjectForm() {
      const disableOverlay = document.getElementById('disable-overlay');
      disableOverlay.classList.remove('show');
      disableOverlay.classList.add('show');

      const formContainer = document.createElement('div');
      formContainer.classList.add('form-container');

      const addProjectForm = document.createElement('form');
      addProjectForm.classList.add('form');

      formContainer.appendChild(addProjectForm);

      const projectNameInput = document.createElement('input');
      projectNameInput.placeholder = 'Enter a name for your new project';

      projectNameInput.addEventListener('input', checkFormValidity);

      function checkFormValidity() {
         const projectNameLength = projectNameInput.value.length;

         if (projectNameLength > 3) {
            submitBtn.disabled = false;
         } else {
            submitBtn.disabled = true;
         }
      }

      addProjectForm.appendChild(projectNameInput);

      const iconsContainer = document.createElement('div');
      iconsContainer.classList.add('project-icons');

      addProjectForm.appendChild(iconsContainer);

      let currentIcon = 'tag';

      const iconOptions = [
         { icon: 'tag', label: 'Default' },
         { icon: 'work', label: 'Work' },
         { icon: 'school', label: 'School' },
         { icon: 'self_care', label: 'Self-care' },
         { icon: 'self_improvement', label: 'Improvement' },
         { icon: 'celebration', label: 'Social' },
         { icon: 'sports_esports', label: 'Improvement' },
      ];

      iconOptions.forEach((option) => {
         const iconOption = document.createElement('div');
         iconOption.classList.add('icon-option');
         iconOption.setAttribute('data-icon', option.icon);

         const iconSpan = document.createElement('span');
         iconSpan.classList.add('material-symbols-outlined', 'small');
         iconSpan.textContent = option.icon;

         const labelText = document.createTextNode(option.label);

         if (option.icon == 'tag') {
            iconOption.classList.add('pressed');
         }

         iconOption.appendChild(iconSpan);
         iconOption.appendChild(labelText);

         iconOption.addEventListener('click', () => {
            currentIcon = option.icon;

            document.querySelectorAll('.icon-option').forEach((el) => {
               el.classList.remove('pressed');
            });

            iconOption.classList.add('pressed');
            console.log(currentIcon);
         });

         iconsContainer.appendChild(iconOption);
      });

      const btnsContainer = document.createElement('div');
      btnsContainer.classList.add('form-buttons');

      const cancelBtn = document.createElement('button');
      cancelBtn.classList.add('cancel-btn');
      cancelBtn.textContent = 'Cancel';

      cancelBtn.addEventListener(
         'click',
         (event) => {
            event.preventDefault();

            formContainer.classList.remove('show');
            setTimeout(() => {
               formContainer.remove();
               disableOverlay.classList.remove('show');
               currentIcon = 'tag';
            }, 300);
         },
         { once: true }
      );

      const submitBtn = document.createElement('button');
      submitBtn.classList.add('submit-btn');
      submitBtn.textContent = 'Add project';
      submitBtn.disabled = true;

      btnsContainer.appendChild(cancelBtn);
      btnsContainer.appendChild(submitBtn);

      submitBtn.addEventListener(
         'click',
         (event) => {
            event.preventDefault();

            const projectName = projectNameInput.value;
            const projectIcon = currentIcon;

            ProjectManager.addProject(projectName, projectIcon);
            ProjectRenderer.renderProjectList();

            cancelBtn.click();
         },
         { once: true }
      );

      let formVisible = false;

      setTimeout(() => {
         formVisible = true;
      }, 0);

      document.addEventListener('click', (event) => {
         if (formVisible && !formContainer.contains(event.target)) {
            cancelBtn.click();
         }
      });

      addProjectForm.appendChild(btnsContainer);
      document.body.appendChild(formContainer);

      setTimeout(() => {
         formContainer.classList.add('show');
      }, 10);
   }

   static renderAddTaskForm() {
      const disableOverlay = document.getElementById('disable-overlay');
      disableOverlay.classList.add('show');

      const formContainer = document.createElement('div');
      formContainer.classList.add('form-container');

      const addTaskForm = document.createElement('form');
      addTaskForm.classList.add('form');

      formContainer.appendChild(addTaskForm);

      const taskNameInput = document.createElement('input');
      taskNameInput.placeholder = 'Enter a name for your new task';
      taskNameInput.required = true;
      taskNameInput.minLength = 5;

      const taskDescriptionInput = document.createElement('input');
      taskDescriptionInput.classList.add('description-input');
      taskDescriptionInput.placeholder = 'Description';
      taskNameInput.required = true;
      taskNameInput.minLength = 5;

      const dateDiv = document.createElement('div');
      dateDiv.classList.add('date-container');

      const dateLabel = document.createElement('label');
      dateLabel.textContent = 'Should be finished before: ';

      const taskDateInput = document.createElement('input');
      taskDateInput.type = 'date';
      taskDateInput.classList.add('date-input');

      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      taskDateInput.value = formattedDate;

      dateDiv.appendChild(dateLabel);
      dateDiv.appendChild(taskDateInput);

      const priorityContainer = document.createElement('div');
      priorityContainer.classList.add('project-icons');

      let currentPriority = 'sentiment_neutral';

      const priorityOptions = [
         { icon: 'sentiment_neutral', label: 'Normal' },
         { icon: 'warning', label: 'Urgent' },
         { icon: 'spa', label: 'Relaxed' },
      ];

      priorityOptions.forEach((option) => {
         const priorityOption = document.createElement('div');
         priorityOption.classList.add('icon-option');
         priorityOption.setAttribute('data-icon', option.icon);

         const iconSpan = document.createElement('span');
         iconSpan.classList.add('material-symbols-outlined', 'small');
         iconSpan.textContent = option.icon;

         const labelText = document.createTextNode(option.label);

         if (option.icon == 'sentiment_neutral') {
            priorityOption.classList.add('pressed');
         }

         priorityOption.appendChild(iconSpan);
         priorityOption.appendChild(labelText);

         priorityOption.addEventListener('click', () => {
            currentPriority = option.label;

            document.querySelectorAll('.icon-option').forEach((el) => {
               el.classList.remove('pressed');
            });

            priorityOption.classList.add('pressed');
            console.log(currentPriority);
         });
         priorityContainer.appendChild(priorityOption);
      });

      const projects = ProjectManager.getProjectNamesAndIcons();
      let currentProject = document.getElementById('list-title').textContent;
      if (
         currentProject === 'Today' ||
         currentProject === 'Upcoming' ||
         currentProject === 'Completed' ||
         currentProject === 'All your tasks'
      ) {
         if (!document.querySelector('.project-name-p')) {
            alert('Add a task first.');
            disableOverlay.classList.remove('show');
            return;
         } else {
            currentProject = document.querySelector('.project-name-p').textContent;
         }
      }
      let currentProjectIcon = '';
      projects.forEach((project) => {
         if (project.name === currentProject) {
            currentProjectIcon = project.icon;
         }
      });

      const projectsDropdownContainer = document.createElement('div');

      const projectsDropdownBtn = document.createElement('div');
      projectsDropdownBtn.classList.add('projects-dropdown-btn');

      let currentIconSpan = document.createElement('span');
      currentIconSpan.classList.add('material-symbols-outlined', 'small');
      currentIconSpan.textContent = currentProjectIcon;

      let initialProject = currentProject;
      let currentlySelectedProject = initialProject;
      let currentProjectText = document.createTextNode(currentProject);

      projectsDropdownBtn.appendChild(currentIconSpan);
      projectsDropdownBtn.appendChild(currentProjectText);

      projectsDropdownContainer.appendChild(projectsDropdownBtn);
      projectsDropdownContainer.classList.add('projects-dropdown-list');

      const optionsContainer = document.createElement('div');
      optionsContainer.classList.add('options-container');
      projectsDropdownContainer.appendChild(optionsContainer);

      projects.forEach((project) => {
         if (project.name === currentlySelectedProject) {
            return;
         }

         const projectOption = document.createElement('div');

         projectOption.classList.add('option');

         const projectIconSpan = document.createElement('span');
         projectIconSpan.classList.add('material-symbols-outlined', 'small');
         projectIconSpan.textContent = project.icon;

         const projectText = document.createTextNode(project.name);

         projectOption.appendChild(projectIconSpan);
         projectOption.appendChild(projectText);

         projectOption.addEventListener('click', () => {
            currentlySelectedProject = project.name;
            currentProjectText.textContent = project.name;
            currentIconSpan.textContent = project.icon;

            optionsContainer.classList.toggle('show');

            regenerateDropdown();
         });

         optionsContainer.appendChild(projectOption);
      });

      function regenerateDropdown() {
         optionsContainer.innerHTML = '';

         projects.forEach((project) => {
            if (project.name === currentlySelectedProject) {
               return;
            }

            const projectOption = document.createElement('div');

            projectOption.classList.add('option');

            const projectIconSpan = document.createElement('span');
            projectIconSpan.classList.add('material-symbols-outlined', 'small');
            projectIconSpan.textContent = project.icon;

            const projectText = document.createTextNode(project.name);

            projectOption.appendChild(projectIconSpan);
            projectOption.appendChild(projectText);

            projectOption.addEventListener('click', () => {
               currentlySelectedProject = project.name;
               currentProjectText.textContent = project.name;
               currentIconSpan.textContent = project.icon;

               optionsContainer.classList.toggle('show');
               console.log(currentlySelectedProject);

               regenerateDropdown();
            });

            optionsContainer.appendChild(projectOption);
         });
      }

      let dropdownVisible = false;
      let dropdownClicking = false;

      projectsDropdownBtn.addEventListener('click', (event) => {
         event.preventDefault();
         event.stopPropagation();

         dropdownClicking = true;
         dropdownVisible = !dropdownVisible;

         optionsContainer.classList.toggle('show');
      });

      document.addEventListener('click', (event) => {
         if (!projectsDropdownBtn.contains(event.target) && !optionsContainer.contains(event.target)) {
            optionsContainer.classList.remove('show');
         }
      });

      const btnsContainer = document.createElement('div');
      btnsContainer.classList.add('form-buttons');

      const cancelBtn = document.createElement('button');
      cancelBtn.classList.add('cancel-btn');
      cancelBtn.textContent = 'Cancel';

      cancelBtn.addEventListener(
         'click',
         (event) => {
            event.preventDefault();

            formContainer.remove();
            disableOverlay.classList.remove('show');
            document.querySelector('.flatpickr-calendar').remove();
            currentPriority = 'Normal';
         },
         { once: true }
      );

      const submitBtn = document.createElement('button');
      submitBtn.classList.add('submit-btn');
      submitBtn.textContent = 'Add project';
      submitBtn.disabled = true;

      btnsContainer.appendChild(cancelBtn);
      btnsContainer.appendChild(submitBtn);

      const addTaskFooter = document.createElement('div');
      addTaskFooter.classList.add('add-project-footer');

      addTaskFooter.appendChild(projectsDropdownContainer);
      addTaskFooter.appendChild(btnsContainer);

      taskNameInput.addEventListener('input', checkFormValidity);
      taskDescriptionInput.addEventListener('input', checkFormValidity);

      function checkFormValidity() {
         const taskNameLength = taskNameInput.value.length;
         const taskDescriptionLength = taskDescriptionInput.value.length;

         if (taskNameLength > 3 && taskDescriptionLength > 3) {
            submitBtn.disabled = false;
         } else {
            submitBtn.disabled = true;
         }
      }

      submitBtn.addEventListener(
         'click',
         (event) => {
            event.preventDefault();
            const taskName = taskNameInput.value;
            const taskDescription = taskDescriptionInput.value;
            const taskDueDate = taskDateInput.value;
            const taskPriority = currentPriority;
            const taskCompleted = false;
            const taskProject = currentlySelectedProject;

            const newTask = new Task(taskName, taskDescription, taskDueDate, taskPriority, taskCompleted, taskProject);

            console.log(newTask);

            TaskManager.addTask(taskProject, newTask);

            cancelBtn.click();
         },
         { once: true }
      );

      addTaskForm.appendChild(taskNameInput);
      addTaskForm.appendChild(taskDescriptionInput);
      addTaskForm.appendChild(dateDiv);
      addTaskForm.appendChild(priorityContainer);
      addTaskForm.appendChild(addTaskFooter);

      flatpickr(taskDateInput, {
         dateFormat: 'd-m-Y',
         defaultDate: 'today',
      });

      document.body.appendChild(formContainer);

      let formVisible = false;

      setTimeout(() => {
         formVisible = true;
      }, 0);



      document.addEventListener('click', (event) => {
         if (formVisible && !dropdownClicking) {
            if (
               !formContainer.contains(event.target) &&
               !projectsDropdownContainer.contains(event.target) &&
               !optionsContainer.contains(event.target)
            ) {
               cancelBtn.click();
            }
         }
         dropdownClicking = false;
      });

      setTimeout(() => {
         formContainer.classList.add('show');
      }, 10);
   }
}
