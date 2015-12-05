import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import boardDataBuilder from './builders/boardDataBuilder'
import ChessBall from './components/ChessBall'
import reducers from './reducers'

let store = createStore(reducers)

const boardData = boardDataBuilder()

const domNode = document.getElementById('game')

ReactDOM.render(
  <Provider store={store}>
    <ChessBall board={boardData} />
  </Provider>,
  domNode
)
