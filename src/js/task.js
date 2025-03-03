import { formatISO } from 'date-fns'

export class Task {
   constructor(name, description = "", dueDate = null, priority, completed = false, projectName = null) {
      this.name = name,
      this.description = description,
      this.dueDate = dueDate ? formatISO(new Date(dueDate)) : null;
      this.priority = priority,
      this.completed = false;
      this.projectName = projectName;
   }

   toggleComplete() {
      this.completed = !this.completed;
   }
}