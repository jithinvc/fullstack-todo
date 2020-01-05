import React, {Component} from 'react';
import TodoPage from './TodoPage';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import './App.scss';
export default class App extends Component {
  render () {
    return <Router><TodoPage/></Router>
  }
}