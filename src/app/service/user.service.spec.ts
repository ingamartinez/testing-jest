import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Todo } from '../models/todo';
import { HttpRequest } from '@angular/common/http';

const listTodos: Todo[] = [
  {
    id: 1,
    title: "delectus aut autem",
    completed: false
  },
  {
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false
  }
];

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
    jest.setTimeout(10000)
  })

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTodos return a list of ToDos', done => {
    service.getTodos().subscribe((res: Todo[]) => {
      try {
        expect(res).toBe(listTodos);
        done();
      }catch (e){
        done(e);
      }
    });
    const url = "http://localhost:3000/todos";
    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('GET');

    req.flush(listTodos);
  });

  it('createTodo creates a ToDo and return it', done => {
    const expected: Todo = {
      title: "New Todo",
      completed: false
    };

    service.createTodo("New Todo").subscribe((res: Todo) => {
      try {
        expect(res).toBe(expected);
        done();
      }catch (e){
        done(e);
      }
    });
    const url = "http://localhost:3000/todos/";
    const req =  httpMock.expectOne((req: HttpRequest<any>) => {
      return req.method === 'POST' && req.url === url;
    });

    expect(req.request.method).toBe('POST');
    req.flush(expected);
  });

  it('updateTodo update a ToDo complete attribute and return it', done => {
    const expected: Todo = {
      id: 1,
      title: "delectus aut autem",
      completed: false
    };

    service.updateTodo(listTodos[0]).subscribe((res: Todo) => {
      try {
        expect(res).toBe(expected);
        done();
      }catch (e){
        done(e);
      }
    });
    const url = "http://localhost:3000/todos/1";
    const req =  httpMock.expectOne((req: HttpRequest<any>) => {
      return req.method === 'PATCH' && req.url === url;
    });

    expect(req.request.method).toBe('PATCH');
    req.flush(expected);
  });

  it('deleteTodo delete a ToDo and return it', done => {
    const expected: Todo = {};

    service.deleteTodo(listTodos[0]).subscribe((res: Todo) => {
      try {
        expect(res).toBe(expected);
        done();
      }catch (e){
        done(e);
      }
    });
    const url = "http://localhost:3000/todos/1";
    const req =  httpMock.expectOne((req: HttpRequest<any>) => {
      return req.method === 'DELETE' && req.url === url;
    });

    expect(req.request.method).toBe('DELETE');
    req.flush(expected);
  });
});
