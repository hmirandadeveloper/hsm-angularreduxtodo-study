import { ITodo } from './models/todo.model';
import { ETodoActions } from './actions'

// All states
export interface IAppState {
    todos: ITodo[];
    lastUpdate: Date;
}

export const INITIAL_STATE: IAppState = {
    todos: [],
    lastUpdate: null
}

// My reducer (state = 'oldState', action = 'the dispatched action')
export function rootReducer(state, action) {
    switch(action.type) {
        case ETodoActions.ADD:
            console.log(ETodoActions.ADD);
            action.todo.id = state.todos.length + 1;
            return Object.assign({}, state, {
                todos: state.todos.concat(Object.assign({}, action.todo)),
                lastUpdate: new Date()
            });
            
        case ETodoActions.TOGGLE:
            console.log(ETodoActions.TOGGLE);
            var todo: ITodo = state.todos.find(td => td.id === action.id);
            var index: number = state.todos.indexOf(todo);
            return Object.assign({}, state, {
                todos: [
                    ...state.todos.slice(0, index),
                    Object.assign({}, todo, {isCompleted: !todo.isCompleted}),
                    ...state.todos.slice(index + 1)
                ],
                lastUpdate: new Date()
            });
        case ETodoActions.REMOVE:
            console.log(ETodoActions.REMOVE);
            return Object.assign({}, state, {
                todos: state.todos.filter(todo => todo.id !== action.id),
                lastUpdate: new Date()
            });
        case ETodoActions.REMOVE_ALL:
            return Object.assign({}, state, {
                todos: [],
                lastUpdate: new Date()
            });
        default:
            return state;        
    }
}