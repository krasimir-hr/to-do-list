import { Project } from "./project";
import { ProjectStorage } from "./projectStorage" 
import { ProjectRenderer } from "./projectRenderer";
import { TaskManager } from "./taskManager";
import { Task } from "./task";

export class ProjectManager {
   static projects = ProjectStorage.loadProjects();
   
   static addProject(name, icon) {
      const project = new Project(name, icon);
      this.projects.push(project);
      ProjectStorage.saveProjects(this.projects);
      return project;
   }

   static removeProjects(index) {
      this.projects.splice(index, 1);
      ProjectStorage.saveProjects(this.projects);
   }

   static getProjects() {
      return this.projects;
   }

   static getProjectNamesAndIcons() {
      return this.projects.map(project => ({
         name: project.name,
         icon: project.icon,
      }));
   }

   static createDefaultProject() {
      const projects = this.getProjects();

      const defaultProjectExists = projects.some(project => project.name === 'Personal');

      if (!defaultProjectExists) {
         const defaultProject = this.addProject('Personal', 'tag')

         const today = new Date().toISOString();
         
         const defaultTasks = [
            new Task(
               'Complete your first task',
               'Do so by clicking on the checkmark next to it. You can also edit or delete tasks.',
               today,
               'Normal',
               false,
               'Personal'
            ),
            new Task(
               'Task 2',
               'Description of Task 2',
               today,
               'Urgent',
               false,
               'Personal'
            )
         ];

         defaultTasks.forEach(task => {
            TaskManager.addTask('Personal', task)
         })
      }

      ProjectRenderer.renderProjectList();
   }
}

