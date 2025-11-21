import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, CreateTodoDto, UpdateTodoDto } from '@packages/types';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001/v1/todos';
  private readonly httpOptions = { withCredentials: true };

  findAll() {
    return this.http.get<Todo[]>(this.apiUrl, this.httpOptions);
  }

  create(dto: CreateTodoDto) {
    return this.http.post<Todo>(this.apiUrl, dto, this.httpOptions);
  }

  update(id: number, dto: UpdateTodoDto) {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}`, dto, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete<Todo>(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}
