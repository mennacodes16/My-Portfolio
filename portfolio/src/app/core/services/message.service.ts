
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMessage, IMessageResponse } from '../models/message.model';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getMessages(): Observable<IMessageResponse> {
    return this.http.get<IMessageResponse>(
      this.apiUrl + '/messages'
    );
  }
  sendMessage(data: IMessage): Observable<IMessage> {
    return this.http.post<IMessage>(
      this.apiUrl + '/message',
      data
    );
  }
}