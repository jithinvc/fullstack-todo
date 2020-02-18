import React, {Component} from 'react';
import TodoPage from './TodoPage';
import LoginContainer from './LoginContainer';
import SignUpContainer from './SignUpContainer';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './App.scss';
//add routes
const OVERLAY_COMPONENT_MAP = {
  LOGIN: LoginContainer,
  //SIGNUP: SignInContainer,
  //FORGOT_CREDS: ForgotCredsContainer
};
export default class App extends Component {
  render () {
    return (
        <Router>
          <Switch>
            <Route path="/todos" component={TodoPage} />
            <Route path="/login" component={LoginContainer} />
            <Route path="/signup" component={SignUpContainer} />
            <Route path="/" component={LoginContainer} />
          </Switch>
          {}
        </Router>
    )
  }
}