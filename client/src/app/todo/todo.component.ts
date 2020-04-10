import { Component, OnInit, OnChanges } from '@angular/core';
import { TodoService } from '../todo.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todo: string = '';
  constructor(
    public todoService: TodoService,
    public _authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.todoService.getAllTodos();
  }
  saveTodo() {
    let todoObj = {
      todo: this.todo
    };
    this.todoService.createTodo(todoObj);
  }
}
