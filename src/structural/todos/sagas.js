import {
    put,
    takeLatest,
    all,
    call,
    select
} from 'redux-saga/effects'
import Immutable from 'seamless-immutable'

import {
    helloOutReachApi,
    bearerToken
} from '../../env'

function* loadTodosSaga (action) {

    // Get params
    const params = {
        resourceId: action.resourceId || '158',
        resourceType: action.resourceType || 'campaigns'
    }

    // Set up api fetch config
    const config = {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + bearerToken
        })
    }

    // Function to call api
    const apiCallToFetchPost = (queryParams) => (
        fetch(helloOutReachApi + '?resource_id=' + queryParams.resourceId + '&resource_type=' + queryParams.resourceType, config).then(response => (
            Promise.resolve(response.json())
        )).catch((error) => {
            throw new Error(error)
        })
    )

    try {
        const response = yield call(apiCallToFetchPost, params)

        // Add markAsDone property to each todoItem
        if (response && response.results) {
            var todoItems = response.results.map(todoItem => ({ ...todoItem, markAsDone: false}))
        }

        // Put todos in store
        yield put({ type: 'TODOS_RECEIVED', todos: { todoItems, params } })
        
    } catch (error) {

        // If api call fails, put error in store
        yield put({
            type: 'TODOS_ERROR',
            error
        })
    }

}

function* updateTodoItemSaga (action) {

    const params = {
        resourceId: action.updatedTodoItem.resource_id,
        resourceType: action.updatedTodoItem.resource_type
    }

    // Get todos from state
    const todos = yield select((state) => state.todos)

    let mutableTodos = Immutable.asMutable(todos.todoItems)

    const indexToUpdate = mutableTodos.findIndex(todoItem => todoItem.id === action.updatedTodoItem.id)
    mutableTodos[indexToUpdate] = action.updatedTodoItem

    // Put todos in store
    yield put({ type: 'TODOS_RECEIVED', todos: { todoItems: mutableTodos, params } })

}

export default function* rootSaga() {
    yield all([
        takeLatest('LOAD_TODOS', loadTodosSaga),
        takeLatest('UPDATE_TODO_ITEM', updateTodoItemSaga)
    ])
}