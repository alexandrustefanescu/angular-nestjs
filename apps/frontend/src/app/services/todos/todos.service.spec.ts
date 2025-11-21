import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(TodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
