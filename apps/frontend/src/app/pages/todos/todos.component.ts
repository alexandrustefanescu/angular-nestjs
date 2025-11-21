import { Component, inject, resource, signal, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { firstValueFrom } from 'rxjs';
import { Todo } from '@packages/types';
import { TechStackComponent } from '../../components/tech-stack/tech-stack.component';
import { TodosService } from '../../services/todos/todos.service';
import { Field, form, required } from '@angular/forms/signals';

interface TodoFormData {
  title: string;
}

@Component({
  selector: 'app-todos',
  imports: [Field, TechStackComponent, MatButtonModule, MatIconModule, MatCheckboxModule, MatInputModule, MatFormFieldModule],
  templateUrl: './todos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  private todosService = inject(TodosService);

  private newTodoModel = signal<TodoFormData>({ title: '' });
  newTodoForm = form(this.newTodoModel, (f) => {
    required(f.title, { message: 'Todo title is required' });
  });

  todosResource = resource({
    loader: () => firstValueFrom(this.todosService.findAll()),
  });

  addTodo() {
    const title = this.newTodoModel().title.trim();
    if (!title) return;

    this.todosService.create({ title }).subscribe(() => {
      this.newTodoModel.set({ title: '' });
      this.todosResource.reload();
    });
  }

  toggleTodo(todo: Todo) {
    this.todosService
      .update(todo.id, { isCompleted: !todo.isCompleted })
      .subscribe(() => {
        this.todosResource.reload();
      });
  }

  deleteTodo(id: number) {
    this.todosService.delete(id).subscribe(() => {
      this.todosResource.reload();
    });
  }
}
