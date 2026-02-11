import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { Todo } from './todo';

describe('Todo', () => {
  let component: Todo;
  let fixture: ComponentFixture<Todo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Todo],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Todo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
describe('Add + Render', () => {
  let component: Todo;
  let fixture: ComponentFixture<Todo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Todo],
      providers: [provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Todo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should add a todo item', () => {
      component.newTodoTitle = 'Test Todo';
       component.addTodo('Test Todo');
       fixture.detectChanges();
       expect(component.todos.length).toBe(1);
       expect(component.todos[0].title).toBe('Test Todo');

       const compiled = fixture.nativeElement as HTMLElement;
       expect(compiled.querySelectorAll('.todo-item').length).toBe(1);
    });

    it('should not add an empty todo item', () => {
      component.newTodoTitle = '';
      component.addTodo('');
      fixture.detectChanges();
      expect(component.todos.length).toBe(0);
    });

    it('should clear the input after adding a todo', () => {
      component.newTodoTitle = 'Another Test Todo';
      component.addTodo('Another Test Todo');
      fixture.detectChanges();
      expect(component.newTodoTitle).toBe('');
    });

    it('should render multiple todo items', () => {
      component.newTodoTitle = 'First Todo';
      component.addTodo('First Todo');
      component.newTodoTitle = 'Second Todo';
      component.addTodo('Second Todo');
      fixture.detectChanges();
      expect(component.todos.length).toBe(2);

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelectorAll('.todo-item').length).toBe(2);
    });


    it('should add a todo from the input when Add Todo is clicked', () => {

      const input = fixture.nativeElement.querySelector("[name='newTodo']") as HTMLInputElement;
      const button = fixture.nativeElement.querySelector('#AddTodoBtn') as HTMLButtonElement;

      input.value = 'Click Test Todo';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      button.click();
      fixture.detectChanges();

      expect(component.todos.length).toBe(1);
      expect(component.todos[0].title).toBe('Click Test Todo');

    });
});
