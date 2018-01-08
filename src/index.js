import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import './index.css';
import App from './App';
import hkTesterStore from "./store/HKTesterStore";

ReactDOM.render(
    <Provider store={hkTesterStore}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root'));

    window.store = hkTesterStore;
