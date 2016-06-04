import React from 'react'
import {Provider} from 'react-redux'
import Game from 'src/containers/Game'

const Root = ({store}) => {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  )
}

export default Root
