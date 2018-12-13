import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../store';
import { ETodoActions } from '../../actions';
import { ITodo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @select() todos;

  model: ITodo = {
    id: 0,
    description: '',
    responsible: '',
    priority: 'low',
    isCompleted: false
  };

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
  }

  // onSubmit
  addTodo() {
    this.ngRedux.dispatch({type: ETodoActions.ADD, todo: this.model}); // payload => this.model
  }

  toggleTodo(todo: ITodo) {
    this.ngRedux.dispatch({type: ETodoActions.TOGGLE, id: todo.id}); // payload => todo.id
  }

  removeTodo(todo: ITodo) {
    this.ngRedux.dispatch({type: ETodoActions.REMOVE, id: todo.id}); // payload => todo.id
  }
}
