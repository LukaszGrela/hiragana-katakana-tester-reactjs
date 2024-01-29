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
import MediaQuery from 'react-responsive';
import NoMatch from './NoMatch';
import Home from './Home';
import Footer from '../components/Footer';

import IconKatakanaKa from '../icons/IconKatakanaKa';
import IconHiraganaKa from '../icons/IconHiraganaKa';
import IconArrowBack from '../icons/IconArrowBack';
import IconSettings from '../icons/IconSettings';
import IconInfo from '../icons/IconInfo';
import IconMore from '../icons/IconMore';

import About from './About';
import Game from './Game';
import Setup from './Setup';

import './css/AppView.css';
import './css/DropDown.css';

export class AppView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '/',
            ddMenuOpen: false
        }

        this.getHeaderLeftSlotFragment = this.getHeaderLeftSlotFragment.bind(this);
        this.getHeaderRightSlotFragment = this.getHeaderRightSlotFragment.bind(this);
        this.handleNavigationAction = this.handleNavigationAction.bind(this);
    }

    componentDidMount() {

        document.addEventListener('keydown', this.handleKeyDown);
        this.unlistenHistory = this.props.history.listen((location, action) => {

            this.setState(_ => ({ location: location.pathname }));
        });
    }
    componentWillUnmount() {

        document.removeEventListener('keydown', this.handleKeyDown);
        this.unlistenHistory();
    }


    handleNavigationAction(id = '/') {
        let to = '/';
        switch (id) {
            case 'config':
                to = '/setup';
                break;
            case 'about':
                to = '/about';
                break;
            case 'game':
                to = '/game';
                break;
            case '/':
            default:
                to = '/';
                break;
        }
        this.setState(_ => ({
            // hide state
            ddMenuOpen: false
        }), _ => {
            // state change applied - navigate
            this.props.history.push(to);
        })
    }


    handleDropDown = () => {
        this.setState(_ => ({ ddMenuOpen: true }));
    }

    handleKeyDown = (event) => {
        const { keyCode: code } = event
        if(this.state.ddMenuOpen && code === 27) {
            // Escape
            event.preventDefault();
            this.setState(_ => ({ ddMenuOpen: false }));
        }
    };

    /**
     * @returns {JSX.Element | null} Returns fragment to be placed in the headers left slot
     */
    getHeaderLeftSlotFragment() {
        const { location } = this.state;

        if (location !== '/') {
            return <button onClick={() => { this.handleNavigationAction() }}><IconArrowBack /></button>

        } else {
            return null;
        }
    }
    getSettingsButton = (label) => (
        <button
            key={'settings-btn'}
            className='button-settings'
            onClick={() => { this.handleNavigationAction('config') }}><IconSettings />
            {label && <span className='label'>{label}</span>}
        </button>
    );
    /**
     * @returns {JSX.Element | null} Returns fragment to be placed in the headers right slot
     */
    getHeaderRightSlotFragment() {
        const { location } = this.state;

        if (location === '/') {
            return [
                <MediaQuery
                    key={'media-query'}
                    minDeviceWidth={410}
                >
                    {(matches) => {
                        if (matches) {
                            /* normal */
                            return [
                                <button
                                    key={'about-btn'}
                                    className='button-about'
                                    onClick={() => { this.handleNavigationAction('about') }}><IconInfo /></button>,

                                this.getSettingsButton()
                            ];
                        } else {
                            /* dd on small devices */
                            return [
                                <button key={'dd-menu-btn'}
                                    className='dd-button-menu'
                                    onClick={() => { this.handleDropDown() }}><IconMore /></button>
                            ]
                        }
                    }}
                </MediaQuery>
            ];
        } else if (location === '/about') {
            return this.getSettingsButton();
        } else {

            return null;
        }
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
                    {
                        /* here we will test for large display */
                        false &&
                        <div className='left-column side'>

                        </div>
                    }
                    <div className={false ? 'right-column main' : 'main'}>

                        <Switch>
                            <Route exact path="/" component={() => { return <Home onNavigation={this.handleNavigationAction} /> }} />
                            <Route exact path="/game" component={() => { return <Game /> }} />
                            <Route exact path="/setup" component={() => { return <Setup /> }} />
                            <Route exact path="/about" component={() => { return <About /> }} />
                            <Route component={NoMatch} />
                        </Switch>

                    </div>
                </div>
                <Footer />
                <div key={'dd-menu-box'}
                    className={'dd-menu' + (this.state.ddMenuOpen ? ' open' : ' close')}>
                    <div className='cloak'
                        onClick={_ => {
                            console.log('cick');
                            this.setState(_ => ({ ddMenuOpen: false }));
                        }}></div>
                    <div className='dd-menu-container'>
                        <button key={'about-btn'} className='button-about'
                            onClick={_ => { this.handleNavigationAction('about') }}><IconInfo /><span className='label'>About</span></button>
                        {this.getSettingsButton('Setup')}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AppView);