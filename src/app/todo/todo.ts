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

  addTodo(title: string) {

    if(this.newTodoTitle != '') {
      const newTodo: ITodo = {
          id: Date.now(),
          title,
          completed: false
      }

      this.todos.push(newTodo);
    }

    this.newTodoTitle = '';
  }
}
