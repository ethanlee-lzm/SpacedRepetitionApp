import { format } from 'date-fns';
import Storage from './Storage';
import Project from './Project';
import Task from './Task';
import UI from './UI'; 

export default class ProjectUI {
  
  // PROJECT ADD EVENT LISTENERS

  static initAddProjectButtons() {
    const addProjectButton = document.getElementById('button-add-project');
    const addProjectPopupButton = document.getElementById(
      'button-add-project-popup',
    );
    const cancelProjectPopupButton = document.getElementById(
      'button-cancel-project-popup',
    );
    const addProjectPopupInput = document.getElementById(
      'input-add-project-popup',
    );

    addProjectButton.addEventListener('click', ProjectUI.openAddProjectPopup);
    addProjectPopupButton.addEventListener('click', ProjectUI.addProject);
    cancelProjectPopupButton.addEventListener('click', ProjectUI.closeAddProjectPopup);
    addProjectPopupInput.addEventListener(
      'keypress',
      ProjectUI.handleAddProjectPopupInput,
    );
  }

  static openAddProjectPopup() {
    const addProjectPopup = document.getElementById('add-project-popup');
    const addProjectButton = document.getElementById('button-add-project');
    UI.closeAllPopups();
    addProjectPopup.classList.add('active');
    addProjectButton.classList.add('active');
  }

  static closeAddProjectPopup() {
    const addProjectPopup = document.getElementById('add-project-popup');
    const addProjectButton = document.getElementById('button-add-project');
    const addProjectPopupInput = document.getElementById(
      'input-add-project-popup',
    );
    addProjectPopup.classList.remove('active');
    addProjectButton.classList.remove('active');
    addProjectPopupInput.value = '';
  }

  static addProject() {
    const addProjectPopupInput = document.getElementById(
      'input-add-project-popup',
    );
    const projectName = addProjectPopupInput.value;

    if (projectName === '') {
      alert("Project name can't be empty");
      return;
    }

    if (Storage.getTodoList().contains(projectName)) {
      addProjectPopupInput.value = '';
      alert('Project names must be different');
      return;
    }

    Storage.addProject(new Project(projectName));
    UI.createProject(projectName);
    ProjectUI.closeAddProjectPopup();
  }

  static handleAddProjectPopupInput(e) {
    if (e.key === 'Enter') UI.addProject();
  }

  // PROJECT EVENT LISTENERS

  static initProjectButtons() {
    const inboxProjectsButton = document.getElementById(
      'button-inbox-projects',
    );
    const todayProjectsButton = document.getElementById(
      'button-today-projects',
    );
    const weekProjectsButton = document.getElementById('button-week-projects');
    const projectButtons = document.querySelectorAll('[data-project-button]');
    const openNavButton = document.getElementById('button-open-nav');

    inboxProjectsButton.addEventListener('click', ProjectUI.openInboxTasks);
    todayProjectsButton.addEventListener('click', ProjectUI.openTodayTasks);
    weekProjectsButton.addEventListener('click', ProjectUI.openWeekTasks);
    projectButtons.forEach((projectButton) =>
      projectButton.addEventListener('click', ProjectUI.handleProjectButton),
    );
    openNavButton.addEventListener('click', ProjectUI.openNav);
  }

  static openInboxTasks() {
    ProjectUI.openProject('Inbox', this);
  }

  static openTodayTasks() {
    Storage.updateTodayProject();
    ProjectUI.openProject('Today', this);
  }

  static openWeekTasks() {
    Storage.updateWeekProject();
    ProjectUI.openProject('This week', this);
  }

  static handleProjectButton(e) {
    const projectName = this.children[0].children[1].textContent;

    if (e.target.classList.contains('fa-times')) {
      ProjectUI.deleteProject(projectName, this);
      return;
    }

    ProjectUI.openProject(projectName, this);
  }

  static openProject(projectName, projectButton) {
    const defaultProjectButtons = document.querySelectorAll(
      '.button-default-project',
    );
    const projectButtons = document.querySelectorAll('.button-project');
    const buttons = [...defaultProjectButtons, ...projectButtons];

    buttons.forEach((button) => button.classList.remove('active'));
    projectButton.classList.add('active');
    ProjectUI.closeAddProjectPopup();
    UI.loadProjectContent(projectName);
  }

  static deleteProject(projectName, button) {
    if (button.classList.contains('active')) UI.clearProjectPreview();
    Storage.deleteProject(projectName);
    UI.clearProjects();
    UI.loadProjects();
  }

  static openNav() {
    const nav = document.getElementById('nav');

    UI.closeAllPopups();
    nav.classList.toggle('active');
  }

  static initProjectButtons() {
    const inboxProjectsButton = document.getElementById(
      'button-inbox-projects',
    );
    const todayProjectsButton = document.getElementById(
      'button-today-projects',
    );
    const weekProjectsButton = document.getElementById('button-week-projects');
    const projectButtons = document.querySelectorAll('[data-project-button]');
    const openNavButton = document.getElementById('button-open-nav');

    inboxProjectsButton.addEventListener('click', ProjectUI.openInboxTasks);
    todayProjectsButton.addEventListener('click', ProjectUI.openTodayTasks);
    weekProjectsButton.addEventListener('click', ProjectUI.openWeekTasks);
    projectButtons.forEach((projectButton) =>
      projectButton.addEventListener('click', ProjectUI.handleProjectButton),
    );
    openNavButton.addEventListener('click', ProjectUI.openNav);
  }

  static openInboxTasks() {
    ProjectUI.openProject('Inbox', this);
  }

  static openTodayTasks() {
    Storage.updateTodayProject();
    ProjectUI.openProject('Today', this);
  }

  static openWeekTasks() {
    Storage.updateWeekProject();
    ProjectUI.openProject('This week', this);
  }

  static handleProjectButton(e) {
    const projectName = this.children[0].children[1].textContent;

    if (e.target.classList.contains('fa-times')) {
      ProjectUI.deleteProject(projectName, this);
      return;
    }

    ProjectUI.openProject(projectName, this);
  }

  static openProject(projectName, projectButton) {
    const defaultProjectButtons = document.querySelectorAll(
      '.button-default-project',
    );
    const projectButtons = document.querySelectorAll('.button-project');
    const buttons = [...defaultProjectButtons, ...projectButtons];

    buttons.forEach((button) => button.classList.remove('active'));
    projectButton.classList.add('active');
    ProjectUI.closeAddProjectPopup();
    UI.loadProjectContent(projectName);
  }

  static deleteProject(projectName, button) {
    if (button.classList.contains('active')) UI.clearProjectPreview();
    Storage.deleteProject(projectName);
    UI.clearProjects();
    UI.loadProjects();
  }

  static openNav() {
    const nav = document.getElementById('nav');

    UI.closeAllPopups();
    nav.classList.toggle('active');
  }
}