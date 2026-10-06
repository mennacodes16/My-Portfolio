
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from '../../core/services/message.service';
import { IMessage } from '../../core/models/message.model';
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  ADMIN_PASSWORD = 'menna16';

  isLoggedIn = false;

  password = '';

  loginError = '';

  activeTab = 'messages';

  messages: IMessage[] = [];

  projects: Project[] = [];

  unreadCount = 0;

  showProjectForm = false;

  editingProject: Project | null = null;

  projectTitle = '';

  projectDescription = '';

  projectImage = '';

  projectLink = '';

  constructor(private messageService: MessageService) {}

  ngOnInit() {

    this.checkLogin();

  }

  // LOGIN

  checkLogin() {

    const login =
      sessionStorage.getItem('isAdminLoggedIn');

    if (login === 'true') {

      this.isLoggedIn = true;

      this.loadMessages();

      this.loadProjects();

    }

  }

  login() {

    if (this.password === this.ADMIN_PASSWORD) {

      sessionStorage.setItem(
        'isAdminLoggedIn',
        'true'
      );

      this.isLoggedIn = true;

      this.loginError = '';

      this.password = '';

      this.loadMessages();

      this.loadProjects();

    } else {

      this.loginError =
        'Wrong password. Try again.';

    }

  }

  logout() {

    sessionStorage.removeItem(
      'isAdminLoggedIn'
    );

    this.isLoggedIn = false;

    this.password = '';

    this.loginError = '';

  }

  // MESSAGES

  loadMessages() {

    this.messageService.getMessages().subscribe({

      next: (response) => {

        this.messages = response.data;

        this.unreadCount = 0;

      },

      error: (error) => {

        console.log(error);

        this.messages = [];

      }

    });

  }

  clearMessages() {

    alert(
      'Delete will be connected to MongoDB next.'
    );

  }

  // PROJECTS

  loadProjects() {

    const saved =
      localStorage.getItem('portfolioProjects');

    if (saved) {

      this.projects =
        JSON.parse(saved);

    } else {

      this.projects = [

        {
          id: 1,

          title: 'Library Website',

          description:
            'A simple library website for displaying books and their information.',

          image: 'img/library.jpeg',

          link: '#'
        },

        {
          id: 2,

          title: 'Calculator',

          description:
            'A simple calculator website for performing basic mathematical operations.',

          image: 'img/calculator.jpeg',

          link: '#'
        },

        {
          id: 3,

          title: 'Store Website',

          description:
            'A simple online store interface for displaying products and their information.',

          image: 'img/store.jpeg',

          link: '#'
        }

      ];

      this.saveProjects();

    }

  }

  saveProjects() {

    localStorage.setItem(
      'portfolioProjects',
      JSON.stringify(this.projects)
    );

  }

  // ADD PROJECT

  addProject() {

    this.editingProject = null;

    this.projectTitle = '';

    this.projectDescription = '';

    this.projectImage = '';

    this.projectLink = '';

    this.showProjectForm = true;

  }

  // EDIT PROJECT

  editProject(project: Project) {

    this.editingProject = project;

    this.projectTitle =
      project.title;

    this.projectDescription =
      project.description;

    this.projectImage =
      project.image;

    this.projectLink =
      project.link;

    this.showProjectForm = true;

  }

  // SAVE PROJECT

  saveProject() {

    const title =
      this.projectTitle.trim();

    const description =
      this.projectDescription.trim();

    const image =
      this.projectImage.trim();

    const link =
      this.projectLink.trim() || '#';

    if (this.editingProject !== null) {

      this.editingProject.title =
        title;

      this.editingProject.description =
        description;

      this.editingProject.image =
        image;

      this.editingProject.link =
        link;

    } else {

      const project: Project = {

        id: Date.now(),

        title: title,

        description: description,

        image: image,

        link: link

      };

      this.projects.push(project);

    }

    this.saveProjects();

    this.cancelProject();

  }

  // DELETE PROJECT

  deleteProject(id: number) {

    const result =
      confirm(
        'Are you sure you want to delete this project?'
      );

    if (result) {

      this.projects =
        this.projects.filter(
          project =>
            project.id !== id
        );

      this.saveProjects();

    }

  }

  // CANCEL PROJECT

  cancelProject() {

    this.showProjectForm = false;

    this.editingProject = null;

    this.projectTitle = '';

    this.projectDescription = '';

    this.projectImage = '';

    this.projectLink = '';

  }

}
