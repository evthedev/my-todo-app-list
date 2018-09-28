import {
    put,
    takeLatest,
    all,
    call
} from 'redux-saga/effects'
import {
    helloOutReachApi,
    bearerToken
} from '../../env'

function* loadTodosSaga (action) {

    // Formulate full api url
    const apiUrl = helloOutReachApi + '?resource_id=' + (action.resourceId || '158') + '&resource_type=' + (action.resourceType || 'campaigns')

    const config = { 
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + bearerToken 
        }
    } 

    try {
        yield call
        const response = yield call(fetch, apiUrl, config);
        const responseJson = response.json();

        yield put({
            type: 'TODOS_RECEIVED',
            todos: responseJson
        })

    } catch (error) {

        yield put({
            type: 'TODOS_ERROR',
            error
        })
    }

}

export default function* rootSaga() {
    yield all([
        takeLatest('LOAD_TODOS', loadTodosSaga)
    ])
}