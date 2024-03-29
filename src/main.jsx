import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import hkTesterStore from './store/HKTesterStore';

import bowser from 'bowser';

import './index.css';

((html) => {
  if (bowser.name) {
    html.className += ' ' + bowser.name;
    html.className += ' ' + bowser.name + '-' + bowser.version;
  }
  if (bowser.osname) {
    html.className += ' ' + bowser.osname;
    html.className += ' ' + bowser.osname + '-' + bowser.osversion;
  }

  if (bowser.mobile) html.className += ' mobile';
  if (bowser.tablet) html.className += ' tablet';
  if (bowser.iphone) html.className += ' iphone';
  if (bowser.ipad) html.className += ' ipad';
  if (bowser.ipod) html.className += ' ipod';
  if (bowser.windowsphone) html.className += ' windowsphone';
  if (
    !bowser.mobile &&
    !bowser.tablet &&
    !bowser.windowsphone &&
    !bowser.iphone &&
    !bowser.ipad &&
    !bowser.ipod
  )
    html.className += ' desktop';
})(document.getElementsByTagName('html')[0]);

// Render app
ReactDOM.render(
  <Provider store={hkTesterStore}>
    <Router basename='/hiragana-katakana-tester'>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
