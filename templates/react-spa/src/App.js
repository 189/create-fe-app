import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';

import Header from './components/Header';
import Reports from './page/reports';
import Boards from './page/boards';

class App extends Component {
  render() {
    return (
      <div className="wrap">
        <Header></Header>
        <div className="main">
          <Switch>
            <Route path="/reports" component={Reports}></Route>
            <Route path="/boards" component={Boards}></Route>
          </Switch>
        </div>
      </div>	
    );
  }
}

export default App;
