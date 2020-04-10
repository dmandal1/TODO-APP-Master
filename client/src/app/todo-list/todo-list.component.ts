import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todo;
  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  deleteTodo(id) {
    this.todoService.deleteTodo(id);
  }
}
