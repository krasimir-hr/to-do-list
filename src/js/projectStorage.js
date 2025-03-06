import { Project } from "./project";
import { Task } from "./task";
import { TaskManager } from "./taskManager";
import { ProjectManager } from "./projectManager";

export class ProjectStorage {
   static saveProjects(projects) {
      const projectData = projects.map(project => {
         return {
            name: project.name,
            icon: project.icon,
         }
      })
      localStorage.setItem("projects", JSON.stringify(projectData));
   }
   

   static loadProjects() {
      let projectsData = JSON.parse(localStorage.getItem("projects")) || [];
      
      return projectsData.map(data => {
         return new Project(
            data.name,
            data.icon,
         )
      })
   }
}