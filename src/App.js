import React, { Component } from "react";
import './App.css';
import {
  Route,
  Switch,
  Redirect,
  
} from 'react-router-dom';

import { createBrowserHistory } from "history";

import MetaMask from "./pages/Metamask";
import Tron from "./pages/Tron";

const history = createBrowserHistory();
class App extends Component {

    render() {
      return(
        <Switch history={history}>
          <Route exact path="/" render={props => (<MetaMask {...props} />)}/> 
          {/* <Route exact path="/" render={props => (<Tron {...props} />)}/> */}
        </Switch>
      )     
    }
}
  
  export default App;