import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { Card, List, Checkbox, Skeleton, Input, Icon } from 'antd'
import 'antd/dist/antd.css'
import logo from '../../assets/images/logo.svg'

import { loadTodos, updateTodoItem } from '../../structural/todos/actions'

class TodosList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isEditing: false
        }

        this._renderTodos = this._renderTodos.bind(this)
        this._toggleEditing = this._toggleEditing.bind(this)
        this._updateTodoList = this._updateTodoList.bind(this)
        this._updateTodoItem = this._updateTodoItem.bind(this)
    }

    _renderTodos () {
        const todos = this.props.todos
        if (todos.loading) {
            return <Skeleton active />
        }
        else if (todos.todoItems && todos.todoItems.length > 0) {
            const todoItems = []
            
            todos.todoItems.forEach((todo) => {
                todoItems.push(
                    <List.Item className={classNames('todos__item', todo.markAsDone && 'todos__item--done')} key={todo.id}>
                        <Checkbox checked={todo.markAsDone} onClick={() => this._updateTodoItem(todo, todo.markAsDone)}/>
                        <a href={todo.resource_link} target='_blank'>{todo.title}</a>
                    </List.Item>
                )
            })
            return todoItems
        } else {
            return (
                <div className='todos__empty'>
                    <Icon type="exclamation-circle" theme="twoTone" />
                    No todos found
                </div>
            )
        }
    }

    _toggleEditing() {
        this.setState((prev) => prev.isEditing = !prev.isEditing)
    }

    _updateTodoList() {
        this.props.actions.loadTodos(this.state.resourceId, this.state.resourceType)
        this._toggleEditing()
    }

    _updateTodoItem(todoItem, todoItemStatus) {
        const updatedTodoItem = {
            ...todoItem,
            markAsDone: !todoItemStatus
        }
        this.props.actions.updateTodoItem(updatedTodoItem)
    }

    componentDidMount () {
        this.props.actions.loadTodos()
    }

    render() {
        return (
            <Card cover={<div className='ant-card-cover-heading'><img src={logo} className='todos__logo' /><span className='todos__heading'>Todo list</span></div>} className='todos__container'>
                <div className='todos__settings'>
                    {this.state.isEditing && (
                        <div className='todos__settings--editing'>
                            <Input addonBefore='Resource Id' defaultValue={`${this.props.todos.todoDetails && this.props.todos.todoDetails.resourceId}`} onChange={(e) => this.setState({resourceId: e.target.value})} />
                            <Input addonBefore='Type' defaultValue={`${this.props.todos.todoDetails && this.props.todos.todoDetails.resourceType}`} onChange={(e) => this.setState({resourceType: e.target.value})}/>
                            <Icon type="like" theme="twoTone" onClick={this._updateTodoList} />
                            
                        </div>
                    )}
                    {!this.state.isEditing && (
                        <div className='todos__settings--not-editing'>
                            <span>
                                {`Resource Id: ${this.props.todos.todoDetails && this.props.todos.todoDetails.resourceId}`} &nbsp; | &nbsp;
                                {`Type: ${this.props.todos.todoDetails && this.props.todos.todoDetails.resourceType}`}
                            </span>
                            <Icon type="edit" theme="twoTone" onClick={this._toggleEditing} />
                            
                        </div>
                    )}
                </div>

                <List itemLayout='horizontal' className='todos__wrapper'>
                    { this._renderTodos() }
                </List>
            </Card>
        )
    }

    componentDidUpdate() {
        if (!this.state.resourceId && this.props.todos.todoDetails && this.props.todos.todoDetails.resourceId) this.setState({resourceId: this.props.todos.todoDetails.resourceId})
        if (!this.state.resourceType && this.props.todos.todoDetails && this.props.todos.todoDetails.resourceType) this.setState({resourceType: this.props.todos.todoDetails.resourceType})
    }
}

const mapStateToProps = (state) => ({
    loading: state.loading,
    todos: state.todos
})

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            loadTodos: (resourceId, resourceType) => dispatch(loadTodos(resourceId, resourceType)),
            updateTodoItem: (updatedTodoItem) => dispatch(updateTodoItem(updatedTodoItem))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosList);
