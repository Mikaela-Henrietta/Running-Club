import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import App from './App';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Members from './Members';
import Home from './Home';
import Profile from './Profile';
import Plans from './Plans';
import withAuth from './withAuth';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path= '/' component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/members" component={withAuth(Members)} /> 
      <Route path="/home" component={Home} /> 
      <Route path="/profile" component={withAuth(Profile)} /> 
      <Route path="/plans" component={Plans} /> 
    </Switch>

  </BrowserRouter>
);
export default Router;