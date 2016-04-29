import * as actions from '../constants/ActionTypes';
import fetchData from '../utils/fetch';

/**
 * 获取Todo列表
 */
function todos(todos) {
  return {
    type: actions.TODOS,
    todos: todos
  };
}

export function requestTodos() {
  return dispatch => {
    fetchData(dispatch, '/api/todos', {
      credentials: 'include'
    }, function (json) {
      dispatch(todos(json.data));
    });
  };
}

/**
 * 添加Todo
 */
function todo(todo) {
  return {
    type: actions.ADD_TODO,
    todo: todo
  };
}

export function requestAddTodo(text) {
  return dispatch => {
    fetchData(dispatch, '/api/todo/add', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text
      })
    }, function (json) {
      dispatch(todo(json.data));
    });
  };
}

/**
 * 更新Todo(编辑文本或修改完成状态)
 */
function editTodo(todo) {
  return {
    type: actions.EDIT_TODO,
    todo: todo
  };
}

export function requestEditTodo(id, text) {
  return dispatch => {
    fetchData(dispatch, '/api/todo/' + id, {
      method: 'put',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text
      })
    }, function (json) {
      dispatch(editTodo(json.data));
    });
  };
}

export function requestCompleteTodo(id, complete) {
  return dispatch => {
    fetchData(dispatch, '/api/todo/' + id, {
      method: 'put',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        complete
      })
    }, function (json) {
      dispatch(editTodo(json.data));
    });
  };
}

/**
 * 删除Todo
 */
function deleteTodo(id) {
  return {
    type: actions.DELETE_TODO,
    id: id
  };
}

export function requestDeleteTodo(id) {
  return dispatch => {
    fetchData(dispatch, '/api/todo/' + id, {
      method: 'delete',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    }, function (json) {
      dispatch(deleteTodo(id));
    });
  };
}