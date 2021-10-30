import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Todo {
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
  results: Todo[];
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
    this.getTodo$.subscribe(next => {
      this._todo$.next(next.results);
    })
  }

  headers = new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem('access')}`)
  postTodo(form: { task: string, completed: boolean }) {
    return this.http.post(`${environment.api_url}/todo/`, form, { headers: this.headers }).pipe(
      tap((next: any) => {
        let curr = this._todo$.value;
        curr.push(next);
        this._todo$.next(curr);
      })
    );;
  }

  private _todo$ = new BehaviorSubject<Todo[]>([]);
  todo$ = this._todo$.asObservable();
  patchTodo(todo: Todo) {
    return this.http.patch<TodoApiResponse>(`${environment.api_url}/todo/${todo.id}/`, todo, { headers: this.headers });
  };

  UpdateTodoToUI(todo: Todo) {
    let currentTodo = this._todo$.value;
    let existing = currentTodo.findIndex(obj => obj.id == todo.id);
    if (existing != -1) {
      currentTodo[existing] = todo;
    } else {
      currentTodo.push(todo);
    }
    this._todo$.next(currentTodo);
  }

  getTodo$ = this.http.get<TodoApiResponse>(environment.api_url + '/todo/', { headers: this.headers });
}
