import React, { Component } from 'react';

// import configureStore from './store'


import TodosList from './containers/TodosList';

import './App.css';

// const store = configureStore()


class App extends Component {
  render() {
    return (

        <TodosList />
    )
  }
}

export default App;
