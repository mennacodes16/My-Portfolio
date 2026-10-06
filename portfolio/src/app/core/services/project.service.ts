import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IProject,IProjectResponse} from '../models/project.model';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getProjects(): Observable<IProjectResponse> {
    return this.http.get<IProjectResponse>(
      this.apiUrl + '/projects'
    );
  }
  addProject(project: IProject): Observable<IProjectResponse> {
    return this.http.post<IProjectResponse>(this.apiUrl + '/projects',project
    );
  }
  updateProject(
    id: string,
    project: IProject
  ):Observable<IProjectResponse> {
    return this.http.put<IProjectResponse>(
      this.apiUrl + '/projects/' + id,
      project
    );
  }
  deleteProject(id: string): Observable<IProjectResponse> {
    return this.http.delete<IProjectResponse>(
      this.apiUrl + '/projects/' + id
    );
  }
}