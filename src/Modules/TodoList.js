export default class TodoList {
    constructor() {
      this.projects = [];
    }
  
    addProject(project) {
      if (this.projects.indexOf(project) > 0) return;
      this.projects.push(project);
    }
  
    removeProject(projectName) {
      const projectToDelete = this.projects.find(
        (project) => project.name === projectName
      );
      this.projects.splice(this.projects.indexOf(projectToDelete), 1);
    }
  
    getProjects() {
      return this.projects;
    }
  }
  
  // module implementation