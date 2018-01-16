/*
   Copyright 2018 Łukasz 'Severiaan' Grela GrelaDesign

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
import React, { Component } from 'react';

import './App.css';

import connect from 'react-redux/lib/connect/connect';

import Splash from './pages/Splash';
import AppView from './pages/AppView';
import { withRouter } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';

class App extends Component {
  render() {
    
    const { location } = this.props;
    return (
      <div className="App">
        {
          !this.props.hasData ?
            (
              location.pathname !== '/' ?
                <Redirect to='/' />
                :
                <Splash />
            )
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
