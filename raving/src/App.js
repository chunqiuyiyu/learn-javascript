import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import Home from './Home';
import Main from './Main';
import About from './About';

import './index.css';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/main" exact component={Main}/>
          <Route path="/about" exact component={About}/>
        </Switch>
    );
  }
}

export default App;