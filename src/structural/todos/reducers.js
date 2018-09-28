const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOAD_TODOS':
            return { ...state, loading: true}

        case 'TODOS_RECEIVED':
            return { ...state, todos: action.todos }
            
        default:
            return state
    }
}

export default reducer