import {combineReducers} from 'redux'
import chips from 'src/reducers/chips'
import passCount from 'src/reducers/pass-count'
import score from 'src/reducers/score'

export default combineReducers({
  chips,
  passCount,
  score
})
