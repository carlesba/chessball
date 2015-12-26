import basic from './basic.js'
import grey from './grey.js'
import bonsai from './bonsai.js'
const palettes = {
  basic,
  grey,
  bonsai
}

export default (palette = 'basic') => {
  return palettes[palette]()
}
