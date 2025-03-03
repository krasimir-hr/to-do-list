import { ProjectManager } from "./projectManager";

export class UIRenderer {
   static renderAddProjectForm() {
      const formContainer = document.createElement('div');
      formContainer.classList.add('form-container');

      const addProjectForm = document.createElement('form');
      addProjectForm.classList.add('form');

      formContainer.appendChild(addProjectForm);

      const projectNameInput = document.createElement('input');
      projectNameInput.placeholder = "Enter a name for your new project";

      addProjectForm.appendChild(projectNameInput);

      const iconsContainer = document.createElement('div');
      iconsContainer.classList.add('project-icons');

      addProjectForm.appendChild(iconsContainer);

      const iconOptions = [
         { icon: 'tag', label: 'Default' },
         { icon: 'work', label: 'Work' },
         { icon: 'school', label: 'School' },
         { icon: 'self_care', label: 'Self-care' },
         { icon: 'self_improvement', label: 'Improvement' },
         { icon: 'celebration', label: 'Social' },
         { icon: 'sports_esports', label: 'Improvement' },
       ];
       
      iconOptions.forEach(option => {
      const iconOption = document.createElement('div');
      iconOption.classList.add('icon-option');
      
      const iconSpan = document.createElement('span');
      iconSpan.classList.add('material-symbols-outlined', 'small');
      iconSpan.textContent = option.icon;
      
      const labelText = document.createTextNode(option.label);
      
      iconOption.appendChild(iconSpan);
      iconOption.appendChild(labelText);
      
      iconsContainer.appendChild(iconOption);
      });

      const btnsContainer = document.createElement('div');
      btnsContainer.classList.add('form-buttons');
      
      const cancelBtn = document.createElement('button');
      cancelBtn.classList.add('cancel-btn');
      cancelBtn.textContent = 'Cancel';

      const submitBtn = document.createElement('button');
      submitBtn.classList.add('submit-btn');
      submitBtn.textContent = 'Add project';

      btnsContainer.appendChild(cancelBtn);
      btnsContainer.appendChild(submitBtn);

      submitBtn.addEventListener('click', (event) => {
         event.preventDefault();
         const projectNameInput = projectName;
      });

      addProjectForm.appendChild(btnsContainer);
      document.body.appendChild(formContainer);
   }
}