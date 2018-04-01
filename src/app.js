import React, {Component} from 'react'
import Board from './board'
import {createGame} from './setup'
import {selectTile} from './game'
import {Some} from 'monet'
import {log} from 'immootable'

const wrapState = game => ({ game })
class App extends Component {
  constructor (props) {
    super(props)
    this.state = wrapState(createGame())
    this.update = this.update.bind(this)
  }
  update (game) {
    this.setState({game})
  }
  render () {
    const {game} = this.state
    console.log('>>game:', game)
    return (
      <Board
        game={game}
        onSelect={index =>
          Some(game)
            .map(selectTile(index))
            .cata(
              e => console.error(e),
              this.update
            )
        }
      />
    )
  }
}

export default App
