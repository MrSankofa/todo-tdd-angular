import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { Todo } from './todo';
/*
*
* Add a todo from an input and button

Render the list

Toggle completed

Delete a todo

Filter: all, active, completed

Clear completed
* */

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
describe( 'Toggle Completed', () => {
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

  it('should toggle completed when clicked false to true', () => {
    component.newTodoTitle = 'Toggle Test Todo';
    component.addTodo('Toggle Test Todo');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const checkboxId = '#Ckbx' + component.todos[0].id;
    const queryString = `.todo-item ${checkboxId}`
    const checkbox = compiled.querySelector(queryString) as HTMLInputElement; // we want the checkbox in the todo list

    expect(checkbox.checked).toBe(false);

    checkbox.click();
    fixture.detectChanges();

    expect(component.todos[0].completed).toBe(true);
    expect(checkbox.checked).toBe(true);

  });

  it ('should toggle completed when multiple todos are present', () => {
    component.newTodoTitle = 'First Toggle Test Todo';
    component.addTodo('First Toggle Test Todo');
    component.newTodoTitle = 'Second Toggle Test Todo';
    component.addTodo('Second Toggle Test Todo');
    component.newTodoTitle = 'Third Toggle Test Todo';
    component.addTodo('Third Toggle Test Todo');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const checkboxId = '#Ckbx' + component.todos[1].id;
    const queryString = `.todo-item ${checkboxId}`
    const checkbox = compiled.querySelector(queryString) as HTMLInputElement; // we want the checkbox in the todo list

    checkbox.click()
    fixture.detectChanges();

    expect(component.todos[1].completed).toBe(true);

  });

  it('should have line through style when completed', () => {
    component.newTodoTitle = 'Style Test Todo';
    component.addTodo('Style Test Todo');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const checkboxId = '#Ckbx' + component.todos[0].id;
    const queryString = `.todo-item ${checkboxId}`
    const checkbox = compiled.querySelector(queryString) as HTMLInputElement; // we want the checkbox in the todo list

    checkbox.click();
    fixture.detectChanges();

    const todoItem = compiled.querySelector('.todo-item') as HTMLElement;
    const todoTitle = todoItem?.querySelector('span') as HTMLElement;
    expect(todoTitle?.classList.contains('completed')).toBe(true);
    const computedStyle = window.getComputedStyle(todoTitle!);
    expect(computedStyle.textDecoration).toContain('line-through');
  });

  it('should apply completed class to correct todo when multiple todos exist', () => {
    component.newTodoTitle = 'First Style Test Todo';
    component.addTodo('First Style Test Todo');
    component.newTodoTitle = 'Second Style Test Todo';
    component.addTodo('Second Style Test Todo');
    component.newTodoTitle = 'Third Style Test Todo';
    component.addTodo('Third Style Test Todo');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    // Toggle the second todo
    const checkboxId = '#Ckbx' + component.todos[1].id;
    const queryString = `.todo-item ${checkboxId}`
    const checkbox = compiled.querySelector(queryString) as HTMLInputElement;

    checkbox.click();
    fixture.detectChanges();

    // Get all todo title spans
    const todoItems = compiled.querySelectorAll('.todo-item') as NodeListOf<HTMLElement>;
    const todoTitles = Array.from(todoItems).map(item => item.querySelector('span') as HTMLElement);

    // First todo should NOT have completed class
    expect(todoTitles[0]?.classList.contains('completed')).toBe(false);

    // Second todo should have completed class
    expect(todoTitles[1]?.classList.contains('completed')).toBe(true);
    const computedStyle = window.getComputedStyle(todoTitles[1]!);
    expect(computedStyle.textDecoration).toContain('line-through');

    // Third todo should NOT have completed class
    expect(todoTitles[2]?.classList.contains('completed')).toBe(false);
  });


  /*
  *
  *
  *
  * */


});
