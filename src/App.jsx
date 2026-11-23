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
import { useEffect } from 'react';

import './App.css';

import { connect } from 'react-redux';

import Splash from './pages/Splash';
import AppView from './pages/AppView';
import { useLocation, Navigate } from 'react-router-dom';

const App = ({ hasData }) => {
  const location = useLocation();
  const page = location.pathname.split('/')[1] || 'home';

  useEffect(() => {
    console.log('route changed', location);
  }, [location]);

  return (
    <div className={'App page-' + page}>
      <div className='app-background'>
        <div className='layer sky'>
          <div className='layer sun'></div>
          <div className='layer mountains'></div>
        </div>
        <div className='layer ground'>
          <div className='layer tree-01'></div>
          <div className='layer tree-02'></div>
          <div className='layer building-01'></div>
          <div className='layer building-02'></div>
          <div className='layer crane crane-01'></div>
        </div>
      </div>
      {!hasData ? (
        location.pathname !== '/' ? (
          <Navigate to='/' replace />
        ) : (
          <Splash />
        )
      ) : (
        <AppView />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    hasData: state.data && state.data.length > 0,
  };
};
export default connect(mapStateToProps)(App);
