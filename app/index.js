import React from 'react'
import ReactDOM from 'react-dom'
import Root from 'src/containers/Root'
import configureStore from 'src/reducers/configureStore'

const store = configureStore()
const domNode = document.getElementById('root')

ReactDOM.render(<Root store={store} />, domNode)
