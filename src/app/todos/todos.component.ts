import { Component, OnDestroy, OnInit } from "@angular/core";
import { TodoService } from "../service/todo.service";
import { Observable, Subscription } from "rxjs";
import { Todo } from "../models/todo";
import { take, tap } from "rxjs/operators";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.scss"]
})
export class TodosComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  activeCount!: number;
  title!: string;

  constructor(protected todoService: TodoService) {
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todos$ = this.todoService.getTodos().pipe(
      tap((todos: Todo[]) => this.activeCount = todos.filter(todo => todo.completed === false).length)
    );
  }

  create() {
    this.todoService.createTodo(this.title).pipe(take(1)).subscribe(() => this.loadTodos());
  }

  checked(todo: Todo) {
    this.todoService.updateTodo(todo).pipe(take(1)).subscribe(() => this.loadTodos());
  }

  delete(todo: Todo) {
    this.todoService.deleteTodo(todo).pipe(take(1)).subscribe(() => this.loadTodos());
  }
}
