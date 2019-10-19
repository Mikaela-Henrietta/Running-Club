import axios from 'axios'

export const addUser = ({username, password}) => {
  return axios.post('/api/users', {
    username, 
    password
  })
}

export const getUsers = () => {
  return axios.get('/api/users')
}

export const getUser = (id) => {
  return axios.get(`/api/users/${id}`)
}

export const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}`)
}

export const updateUser = (user) => {
  return axios.patch(`/api/users/${user._id}`, {user})
}

export const authenticate = ({username, password}) => {
  return axios.post('/api/authenticate', {
    username, 
    password
  })
}

export const payMonthlyFee = (id, creditCardNumber) => {
  return axios.post(`/api/users/${id}/paymonthlyfee`, {
    creditCardNumber
  })
}
 
export const checkToken = () => {
  return axios.get('/api/checkToken')
}

export const logoutUser = () => {
  return axios.post('/api/logout')
}