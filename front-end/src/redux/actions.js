import {addUser, getUsers, deleteUser, updateUser, authenticate} from '../api/usersApi' 

// Action types
export const CURRENT_USER = 'CURRENT_USER'
export const USERS_LOADED = 'USERS_LOADED'
export const USER_DELETED = 'USER_DELETED'


// Actions
export function addUserAction(user, authenticate = true) {
  return dispatch => addUser(user).then((res) => {
    if (authenticate) {
      dispatch(authenticateAction(user));
    }
  })
}

export function setCurrentUserAction(user) {
  return { type: CURRENT_USER, user };
}

export function getUsersAction() {
  return dispatch => getUsers().then((res) => {
    dispatch({ type: USERS_LOADED, users: res.data.users });
  })
}

export function deleteUserAction(id) {
  return dispatch => deleteUser(id).then((res) => {
    if (res.data.status === 'success') {
      dispatch(getUsersAction());
    }
  })
}

export function updateUserAction(user, authenticate = true) {
  return dispatch => updateUser(user).then((res) => {
    if (res.data.status === 'success') {
      dispatch(getUsersAction());
      if (authenticate) {
        dispatch(setCurrentUserAction(res.data.user));
      }
    }
  })
}

export function authenticateAction(user) {
  return dispatch => authenticate(user).then((res) => {
    if (res.status === 200) {
      dispatch(setCurrentUserAction(res.data.user));
    }
  })
}