import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/todo/Header';
import MainSection from '../components/todo/MainSection';
import * as TodoActions from '../actions/todo.js';

class Todo extends Component {
  render() {
    const { todos, actions } = this.props;
    return (
      <div className="todoapp">
        <Header addTodo={actions.requestAddTodo}/>
        <MainSection todos={todos} actions={actions}/>
      </div>
    );
  }
}

Todo.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);