/**
 * 根reducer
 */
import {combineReducers} from 'redux';
import { TODOS, ADD_TODO, EDIT_TODO, DELETE_TODO } from '../constants/ActionTypes';
import errorMessage from './errorMessage';

function todos(state = [], action = null) {
  switch (action.type) {
    case TODOS:
      return Object.assign([], state, action.todos);

    case ADD_TODO:
      return [action.todo, ...state];

    case DELETE_TODO:
      return state.filter(todo =>
          todo.id !== action.id
      );

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.todo.id ? action.todo : todo
      );

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  todos,
  errorMessage
});
export default rootReducer;