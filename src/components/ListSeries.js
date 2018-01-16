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

import IconTick from "../icons/TickIcon";


export class ListSeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data || [],
            selection: this.props.selection || []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.data !== nextProps.data) {
            this.setState({ data: nextProps.data });
        }
        if (this.state.selection !== nextProps.selection) {
            this.setState({ selection: nextProps.selection });
        }
    }

    generateOptions() {
        console.log(this.props);
        const { data, selection } = this.state;
        if (data && selection) {
            const allSelected = selection.length > 0 && isNaN(parseInt(selection, 10));
            return data.map((series) => {
                const { id, name } = series;
                let selected = allSelected || selection.indexOf(id) !== -1;
                console.log(selected);
                return <li
                    key={id}
                    className={'option' + (selected ? ' selected' : '')}
                    onClick={() => {
                        this.props.onItemClicked && this.props.onItemClicked(id, selected);
                    }}
                >
                    <IconTick />
                    <span className='label'>{name.label}</span>
                    <span className='kana'>{name.kana}</span>
                </li>
            })
        }
        return null;
    }

    render() {
        const className = this.props.className || '';
        return (
            <div className={className + ' list-series'}>
                <ul>
                    {
                        this.generateOptions()
                    }
                </ul>
            </div>
        )
    }
}

export default ListSeries;