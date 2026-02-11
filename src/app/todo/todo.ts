import { Component } from '@angular/core';
import {ITodo} from './todo.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [
    FormsModule
  ],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo {
  todos: ITodo[] = [];
  newTodoTitle: string = '';
  nextId: number = 1;

  addTodo(title: string) {

    if(this.newTodoTitle != '') {
      const newTodo: ITodo = {
          id: this.nextId++,
          title,
          completed: false
      }

      this.todos.push(newTodo);
    }

    this.newTodoTitle = '';
  }

  toggleCompleted(todoId: number) {
    const todo = this.todos.find(t => t.id === todoId);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }
}
