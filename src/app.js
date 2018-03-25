import React, {Component} from 'react'
import Board from './board'
import {createGame} from './setup'
import Game from './game'
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
        tiles={game.tiles}
        onSelect={index =>
          this.update(Game(game).selectTile(index))
        }
      />
    )
  }
}

export default App
