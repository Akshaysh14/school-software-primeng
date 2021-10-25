import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Result {
  id: number;
  task: string;
  created_at: string;
  updated_at: string;
  completed: boolean;
  user: string;
}

export interface TodoApiResponse {
  count: number;
  next: string;
  previous: string;
  results: Result[];
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem('access')}`)
  postTodo(form: { task: string, completed: boolean }) {
    return this.http.post(`${environment.api_url}/todo/`, form, { headers: this.headers });
  }

  getTodo$ = this.http.get<TodoApiResponse>(environment.api_url + '/todo/', { headers: this.headers });
}
