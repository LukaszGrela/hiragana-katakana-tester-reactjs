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
        return (
            <div className={this.props.className + ' list-series'}>
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