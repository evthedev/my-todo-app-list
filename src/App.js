import React, { Component } from 'react'

import TodosList from './containers/TodosList'
import 'antd/dist/antd.css'
import './App.css'

class App extends Component {
  render() {
    return (
        <TodosList />
    )
  }
}

export default App;
