import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from '../../core/services/message.service';
import { IMessage } from '../../core/models/message.model';
import { IProject } from '../../core/models/project.model';
import { ProjectService } from '../../core/services/project.service';

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
  projects: IProject[] = [];
  unreadCount = 0;
  showProjectForm = false;
  editingProject: IProject | null = null;
  projectTitle = '';
  projectDescription = '';
  projectImage = '';
  projectLink = '';
  constructor(
    private messageService: MessageService,
    private projectService: ProjectService
  ) {}
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
      sessionStorage.setItem('isAdminLoggedIn','true');
      this.isLoggedIn = true;
      this.loginError = '';
      this.password = '';
      this.loadMessages();
      this.loadProjects();
    } else {
      this.loginError ='Wrong password. Try again.';
    }
  }
  logout() {
    sessionStorage.removeItem('isAdminLoggedIn');
    this.isLoggedIn = false;
    this.password = '';
    this.loginError = '';
  }
  // MESSAGES
  loadMessages() {this.messageService
      .getMessages()
      .subscribe({
        next: (response) => {
          this.messages = response.data;
          this.unreadCount = 0;
        },
        error: (error) => {console.log(error);this.messages = [];
        }
      });
  }
  clearMessages() {
    alert(
      'Delete will be connected to MongoDB next.'
    );
  }
  // PROJECTS
  loadProjects() {this.projectService.getProjects().subscribe({
        next: (response) => {
          this.projects = response.data;
        },
        error: (error) => {console.log(error);this.projects = [];
        }
      });
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
  editProject(project: IProject) {this.editingProject = project;this.projectTitle=
    project.title;this.projectDescription =project.description;
    this.projectImage =project.image;
    this.projectLink = project.link;
    this.showProjectForm = true;
  }
  // SAVE PROJECT
  saveProject() {
    const project: IProject = {
      title: this.projectTitle.trim(),
      description:
        this.projectDescription.trim(),
      image:
        this.projectImage.trim(),
      link:
        this.projectLink.trim()
    };

    if (this.editingProject) {
      this.projectService
        .updateProject(
          this.editingProject._id!,
          project
        )
        .subscribe({next: () => {
            this.loadProjects();
            this.cancelProject();
          },
          error: (error) => {console.log(error);
          }
        });
    } else {this.projectService.addProject(project)
        .subscribe({
          next: () => {this.loadProjects();this.cancelProject();
          },
          error: (error) => {console.log(error);
          }
        });
    }
  }
  // DELETE PROJECT
  deleteProject(id: string) {
    const result =confirm(
        'Are you sure you want to delete this project?'
      );
    if (result) {
      this.projectService.deleteProject(id)
        .subscribe({next: () => { this.loadProjects();
          },
          error: (error)=>{console.log(error);
          }
        });
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
