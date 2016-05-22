const createReducer = (reducerMap, initialState) =>
(state = initialState, action = {}) => {
  const reducer = reducerMap[action.type]
  return reducer
    ? reducer(state, action)
    : state
}
export default createReducer
