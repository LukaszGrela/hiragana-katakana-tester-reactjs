import React, { Component } from 'react';

class NoMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='no-match 404'>
                <div className='wrapper'>
                    <div>404 Not Found!</div>
                </div>
            </div>)
    }
}

export default NoMatch;