import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProject } from '../models/project.model';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(
      this.apiUrl + '/projects'
    );
  }
  addProject(project: IProject): Observable<IProject> {
    return this.http.post<IProject>(
      this.apiUrl + '/projects',
      project
    );
  }
  updateProject(
    id: string,
    project: IProject
  ): Observable<IProject> {
    return this.http.put<IProject>(
      this.apiUrl + '/projects/' + id,
      project
    );
  }
  deleteProject(id: string): Observable<IProject> {
    return this.http.delete<IProject>(
      this.apiUrl + '/projects/' + id
    );
  }
}