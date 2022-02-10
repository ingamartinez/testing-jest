import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private httpClient: HttpClient) { }

  getTodos() {
    const url = "http://localhost:3000/todos";

    return this.httpClient.get<Todo[]>(url);
  }

  updateTodo(todo: Todo) {
    const url = "http://localhost:3000/todos/" + todo.id;

    return this.httpClient.patch<Todo>(url, {
      "completed" : !todo.completed
    });
  }

  createTodo(title: string) {
    const url = "http://localhost:3000/todos/";

    return this.httpClient.post<Todo>(url, {
      "completed" : false,
      "title": title
    });
  }

  deleteTodo(todo: Todo) {
    const url = "http://localhost:3000/todos/" + todo.id;

    return this.httpClient.delete<Todo>(url);
  }
}
