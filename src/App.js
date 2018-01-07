import React, { Component } from 'react';

import './App.css';

import connect from 'react-redux/lib/connect/connect';

import Splash from './pages/Splash';
import AppView from './pages/AppView';
import { withRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        {
          !this.props.hasData ?
            <Splash />
            :
            <AppView />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasData: state.data && state.data.length > 0
  }
};
export default withRouter(connect(mapStateToProps)(App));
