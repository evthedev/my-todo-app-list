import React, { Component } from 'react';
import { connect } from 'react-redux'

import { loadTodos } from '../../structural/todos/actions'

// import './styles.css';

class TodosList extends Component {
  constructor(props) {
    super(props)

    this._renderTodos = this._renderTodos.bind(this)
  }

  _renderTodos () {
    const todos = this.props.todos
    console.log('todos: ', todos);
    if (todos) {
    //   return (
    //     todos.forEach((todo) => <div className={'todos__item'} todo={todo} />)
    //   )
    }
  }

  render() {
    return (
      <div>
          <p onClick={this.props.actions.loadTodos}>Load todos</p>
            { this._renderTodos() }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  todos: state.todos
})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadTodos: (resourceId, resourceType) => dispatch(loadTodos(resourceId, resourceType))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosList);
