import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";

import './index.css';
import App from './App';
import hkTesterStore from "./store/HKTesterStore";

ReactDOM.render(
    <Provider store={hkTesterStore}>
        <App />
    </Provider>
    , document.getElementById('root'));

