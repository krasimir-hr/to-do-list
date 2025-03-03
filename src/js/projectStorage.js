import { Project } from "./project";

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
      const projectsData = JSON.parse(localStorage.getItem("projects")) || [];
      
      return projectsData.map(data => {
         return new Project(
            data.name,
            data.icon,
         )
      })
   }
}