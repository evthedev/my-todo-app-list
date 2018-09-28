import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'

import rootSaga from './structural/todos/sagas'
import App from './App';
import reducers from './reducers'

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(sagaMiddleware),

  );
  
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
