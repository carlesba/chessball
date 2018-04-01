import {render} from 'react-dom'
import React from 'react'
import App from './app'
import monet from 'monet'

export default function mount (id) {
  render(
    <App />,
    document.getElementById(id)
  )
}
window.m = monet
