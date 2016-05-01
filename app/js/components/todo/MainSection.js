import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/ActionTypes';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {filter: SHOW_ALL};
  }

  componentDidMount() {
    let {requestTodos} = this.props.actions;

    requestTodos();
  }

  handleShow(filter) {
    this.setState({filter});
  }

  handleCompleteAll() {
    const { requestCompleteAll } = this.props.actions;
    requestCompleteAll();
  }

  renderToggleAll(completedCount) {
    const { todos } = this.props;
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.length}
               onChange={this.handleCompleteAll.bind(this)}/>
      );
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onShow={this.handleShow.bind(this)}/>
      );
    }
  }

  render() {
    const { todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) =>
        todo.completed ? count + 1 : count, 0
    );

    return (
      <section className="main-section">
        {/*TODO remove this when implement complete all action {this.renderToggleAll(completedCount)}*/}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
              <TodoItem key={todo._id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
