import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleEdit(id, text) {
    const { requestEditTodo } = this.props;
    requestEditTodo(id, text);
  }

  handleComplete(id, complete) {
    const { requestCompleteTodo } = this.props;
    requestCompleteTodo(id, complete);
  }

  handleDelete(id) {
    const { requestDeleteTodo } = this.props;
    requestDeleteTodo(id);
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.handleDelete(id);
    } else {
      this.handleEdit(id, text);
    }
    this.setState({ editing: false });
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  render() {
    const {todo} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      );
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => this.handleComplete(todo.id, todo.completed)} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text}
          </label>
          <button className="destroy"
                  onClick={() => this.handleDelete(todo.id)} />
        </div>
      );
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
};

export default TodoItem;
