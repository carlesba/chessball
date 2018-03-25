import {render} from 'react-dom'
import React from 'react'
import App from './app'

export default function mount (id) {
  render(
    <App />,
    document.getElementById(id)
  )
}