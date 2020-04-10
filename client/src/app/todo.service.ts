import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class TodoService {
   private createTodoUrl: string = 'api/todo/create';
   private getAllTodosUrl: string = 'api/todo/all';
   private deleteTodoUrl: string = 'api/todo/delete';
   private httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json'
      })
   };
   todos = [];
   constructor(private http: HttpClient, private router: Router) {}

   createTodo(todo) {
      this.http.post(this.createTodoUrl, todo, this.httpOptions).subscribe(
         result => {
            console.log(result);
            this.getAllTodos();
         },
         err => {
            console.log(err);
         }
      );
   }

   getAllTodos() {
      this.http.get(this.getAllTodosUrl).subscribe(
         result => {
            this.todos = result['data']['todos'];
         },
         err => {
            console.log(err.status);
            if (err.status === 401) {
               localStorage.removeItem('token');
               this.router.navigateByUrl('/user/login/');
            }
         }
      );
   }

   deleteTodo(id) {
      this.http.delete(this.deleteTodoUrl + `/${id}`).subscribe(
         res => {
            console.log(res);
            this.getAllTodos();
         },
         err => {
            console.log(err);
         }
      );
   }
}
