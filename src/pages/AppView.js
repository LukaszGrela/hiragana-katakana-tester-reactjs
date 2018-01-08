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
import { withRouter, Switch } from 'react-router-dom';

import Route from 'react-router-dom/Route';
import NoMatch from './NoMatch';
import Home from './Home';
import Footer from '../components/Footer';

import IconKatakanaKa from '../icons/IconKatakanaKa';
import IconHiraganaKa from '../icons/IconHiraganaKa';
import IconArrowBack from '../icons/IconArrowBack';
import IconSettings from '../icons/IconSettings';


import Game from './Game';
import Setup from './Setup';

import './css/AppView.css';

export class AppView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '/'
        }

        this.getHeaderLeftSlotFragment = this.getHeaderLeftSlotFragment.bind(this);
        this.getHeaderRightSlotFragment = this.getHeaderRightSlotFragment.bind(this);
        this.handleNavigationAction = this.handleNavigationAction.bind(this);
    }


    handleNavigationAction(id = '/') {
        let to = '/';
        switch (id) {
            case 'config':
                to = '/setup';
                break;
            case 'game':
                to = '/game';
                break;
            case '/':
            default:
                to = '/';
                break;
        }
        this.setState({ location: to });
        this.props.history.push(to);
    }




    /**
     * @returns {JSX.Element | null} Returns fragment to be placed in the headers left slot
     */
    getHeaderLeftSlotFragment() {
        const { location } = this.state;
        console.log('AppView#getHeaderLeftSlotFragment', location);
        if (location !== '/') {
            return <button onClick={() => { this.handleNavigationAction() }}>
                <IconArrowBack /></button>

        } else {
            return null;
        }
    }
    /**
     * @returns {JSX.Element | null} Returns fragment to be placed in the headers right slot
     */
    getHeaderRightSlotFragment() {
        const { location } = this.state;
        console.log('AppView#getHeaderRightSlotFragment', location);
        if (location === '/') {
            return (
                <button key={'settings-btn'} className='button-settings'
                    onClick={() => { this.handleNavigationAction('config') }}><IconSettings />
                </button>
            )
        }
        return null;
    }
    render() {
        return (
            <div className='app-view'>
                <div className='header'>
                    <div className='left-placeholder'>{this.getHeaderLeftSlotFragment()}</div>
                    <div className='app-title'><IconHiraganaKa /><div className='title-text'>Hiragana/Katakana Tester</div><IconKatakanaKa /></div>
                    <div className='right-placeholder'>{this.getHeaderRightSlotFragment()}</div>
                </div>
                <div className='content'>
                    <div className='left-column side'>

                    </div>
                    <div className='right-column main'>

                        <Switch>
                            <Route exact path="/" component={() => { return <Home onNavigation={this.handleNavigationAction} /> }} />
                            <Route exact path="/game" component={() => { return <Game /> }} />
                            <Route exact path="/setup" component={() => { return <Setup /> }} />
                            <Route component={NoMatch} />
                        </Switch>

                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(AppView);