
import {CURRENT_USER, USERS_LOADED} from './actions'

const initialState = {
  currentUser: {},
  users: []
}

/*
  State updates
*/
function reducers(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER:
    return {
      ...state,
      currentUser: action.user
    }
    case USERS_LOADED:
    return {
      ...state,
      users: action.users
     }
    default:
      return state
  }
}

export default reducers