import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoService } from '../service/todo.service';
import { take, tap } from 'rxjs/operators';
import { Todo } from '../models/todo';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

const listTodos: Todo[] = [
  {
    id: 1,
    title: "delectus aut autem",
    completed: false
  },
  {
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: true
  },
  {
    id: 3,
    title: "quis ut nam facilis",
    completed: false
  },
];

const todoService = {
  getTodos(): Observable<Todo[]> {
    return of(listTodos.slice(0,2));
  },
  createTodo(todo: Todo): Observable<Todo> {
    return of(listTodos[2]);
  },
  updateTodo(todo: Todo): Observable<Todo> {
    return of(listTodos[2]);
  },
};

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosComponent ],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        {
          provide:TodoService,
          useValue: todoService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadTodos should return and observable of Todos List', () => {
    const todoService = fixture.debugElement.injector.get(TodoService);

    const spy1 = jest.spyOn(todoService, 'getTodos');
    component.loadTodos();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(component.activeCount).toBe(1);
  });

  it('create should create a todo and return it', () => {
    const todoService = fixture.debugElement.injector.get(TodoService);

    const spy1 = jest.spyOn(todoService, 'createTodo');
    component.create();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(component.activeCount).toBe(1);
  });

  it('create should create a todo and return it', () => {
    const todoService = fixture.debugElement.injector.get(TodoService);
    const spy1 = jest.spyOn(todoService, 'updateTodo');
    component.checked(listTodos[2]);

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(component.activeCount).toBe(1);
  });
});
