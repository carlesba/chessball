import reducers from 'src/reducers'
import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'

const configureStore = () => {
  const logger = createLogger()
  return createStore(
    reducers,
    applyMiddleware(logger)
  )
}

export default configureStore
