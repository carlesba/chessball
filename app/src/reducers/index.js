import {combineReducers} from 'redux'
import chips from 'src/reducers/chips'
import passCount from 'src/reducers/pass-count'

export default combineReducers({
  chips,
  passCount
})
