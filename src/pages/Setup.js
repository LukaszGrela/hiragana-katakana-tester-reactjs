import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import CheckboxSwitch from '../components/CheckboxSwitch';


class Setup extends Component {
    constructor(props) {
        super(props);
        console.log("Setup#constructor");
        this.state = {
            syllabary_selection: !!this.props.syllabary_selection || false
        }

    }

    generateOptions() {
        console.log(this.props);
        const { data, selection } = this.props;
        if (data && selection) {
            const allSelected = selection.length > 0 && isNaN(parseInt(selection, 10));
            return data.map((series) => {
                const { id, name } = series;
                let selected = allSelected || selection.indexOf(id) !== -1;
                console.log(selected);
                return <li
                    key={id}
                    className={'option' + (selected ? ' selected' : '')}
                >
                    <span className='label'>{name.label}</span>
                    <span className='kana'>{name.kana}</span>
                </li>
            })
        }
        return null;
    }
    render() {
        return (
            <div className='setup'>
                <div className='wrapper'>
                    <div className='row test-what'>
                        <CheckboxSwitch
                            id='test-what-switch'
                            labelOn={this.props.syllabary_label_on}
                            labelOff={this.props.syllabary_label_off}
                            isChecked={!!this.props.syllabary_selection}
                        />
                    </div>
                    <div className='row writing'>
                        <CheckboxSwitch
                            id='writing-switch'
                            labelOn={this.props.writing_label_on}
                            labelOff={this.props.writing_label_off}
                            isChecked={!!this.props.writing_selection} />
                    </div>
                    <div className='row series-list'>
                        <ul>
                            {
                                this.generateOptions()
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { test, writing, selection, data } = state;

    console.log("mapStateToProps");

    return {
        selection: selection,
        data: data,

        "syllabary_label_on": test && test.options && test.options.length > 0 ? test.options[1] : '',
        "syllabary_label_off": test && test.options && test.options.length > 0 ? test.options[0] : '',
        "syllabary_selection": test && test.options && test.options.length > 0 ? test.selection : 0,
        "writing_label_on": writing && writing.options && writing.options.length > 0 ? writing.options[1] : '',
        "writing_label_off": writing && writing.options && writing.options.length > 0 ? writing.options[0] : '',
        "writing_selection": writing && writing.options && writing.options.length > 0 ? writing.selection : 0,

    }
}

export default connect(mapStateToProps)(Setup);