import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import boardDataBuilder from './builders/boardDataBuilder'
import Game from './components/Game'
import reducers from './reducers'

let store = createStore(reducers)

const boardData = boardDataBuilder()

const domNode = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <Game board={boardData} />
  </Provider>,
  domNode
)
