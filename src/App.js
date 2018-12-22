import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';

import SignUp from './components/signup'
import Login from './components/login'
import Footer from './views/footer'
import Dashboard from './components/dashboard/dashboard'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Dashboard} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
