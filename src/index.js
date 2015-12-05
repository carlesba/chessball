import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import boardDataBuilder from './builders/boardDataBuilder'
import ChessBall from './components/ChessBall'
import chipsReducer from './reducers/chipsReducer'

let store = createStore(chipsReducer)

const boardData = boardDataBuilder()

const domNode = document.getElementById('game')
// ReactDOM.render(<ChessBall board={boardData} />, domNode)

ReactDOM.render(
  <Provider store={store}>
    <ChessBall board={boardData} />
  </Provider>,
  domNode
)
