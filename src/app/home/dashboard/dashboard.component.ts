import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo, TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {

  }

  data = {
    task: '',
    completed: false
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  addTodo() {
    this.todoService.postTodo(this.data).subscribe((next: any) => {
      console.log(next);
    })
  }

  save(checked: boolean, todo: Todo) {
    todo.completed = checked;
    this.todoService.patchTodo(todo);
  }

  getTodo$ = this.todoService.todo$;

  checked: boolean = false;

}
