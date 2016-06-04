import reducers from 'src/reducers'
import {createStore} from 'redux'

const configureStore = () => {
  return createStore(reducers)
}

export default configureStore
