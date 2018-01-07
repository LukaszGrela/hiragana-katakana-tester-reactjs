import React, { Component } from 'react';
import { withRouter, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import NoMatch from './NoMatch';
import Home from './Home';
import Footer from '../components/Footer';
import IconKatakanaKa from '../icons/IconKatakanaKa';
import IconHiraganaKa from '../icons/IconHiraganaKa';
import Game from './Game';
import Setup from './Setup';

export class AppView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='app-view'>
                <div className='header'><IconHiraganaKa />Hiragana/Katakana Tester <IconKatakanaKa /></div>
                <div className='content'>
                    <div className='left-column side'>

                    </div>
                    <div className='right-column main'>

                        <Switch>
                            <Route exact path="/" component={() => { return <Home /> }} />
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