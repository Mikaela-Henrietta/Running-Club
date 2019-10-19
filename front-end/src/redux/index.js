import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import thunkMiddleware from 'redux-thunk';

// Init store
const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
  ));

export default store;