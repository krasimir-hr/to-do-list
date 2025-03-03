import { Project } from "./project";
import { ProjectStorage } from "./projectStorage" 

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
}

