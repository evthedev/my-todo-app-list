import { routerReducer } from "react-router-redux";
import todosReducer from './structural/todos/reducers'

const reducers = {
    router: routerReducer,
    todos: todosReducer
}

export default reducers