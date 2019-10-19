import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './components/Router';
import { Provider } from 'react-redux';
import store from "../src/redux/index";

ReactDOM.render(<Provider store={store}><Router/></Provider>, document.getElementById('root'));



