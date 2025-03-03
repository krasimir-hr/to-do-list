import { ProjectManager } from "./projectManager";

export class ProjectRenderer {
   static renderProjectList() {
      const projectList = document.getElementById('list-of-projects');
      projectList.innerHTML = "";

      const allProjects = ProjectManager.getProjects();
      allProjects.forEach(project => {
         const projectLi = document.createElement('li');
         projectLi.classList.add('nav-item');

         const projectLink = document.createElement('a');

         const projectIcon = document.createElement('span');
         projectIcon.classList.add('material-symbols-outlined')
         projectIcon.textContent = project.icon;

         const projectName = document.createTextNode(project.name)

         projectLink.appendChild(projectIcon)
         projectLink.appendChild(projectName)

         
         projectLi.appendChild(projectLink);
         projectList.appendChild(projectLi);
      });
   }
}