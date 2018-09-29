const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOAD_TODOS':
            return { ...state, loading: true}

        case 'TODOS_RECEIVED':
            return { ...state, todoItems: action.todos.todoItems, todoDetails: action.todos.params, loading: false }

        default:
            return state
    }
}

export default reducer