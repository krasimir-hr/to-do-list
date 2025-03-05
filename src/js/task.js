import { formatISO, parse, isValid } from 'date-fns'

export class Task {
   constructor(name, description = "", dueDate = null, priority, completed = false, projectName = null) {
      this.name = name;
      this.description = description;

      if (dueDate) {
         if (dueDate.includes("T") && dueDate.includes("-")) {
            this.dueDate = dueDate;
         } else {
            let parsedDate = parse(dueDate, "dd-MM-yyyy", new Date());
            if (isValid(parsedDate)) {
               this.dueDate = formatISO(parsedDate);
            } else {
               console.warn(`Invalid date format: ${dueDate}`);
               this.dueDate = null;
            }
         }
      } else {
         this.dueDate = null;
      }

      this.priority = priority;
      this.completed = completed;
      this.projectName = projectName;
   }

   toggleComplete() {
      this.completed = !this.completed;
   }
}