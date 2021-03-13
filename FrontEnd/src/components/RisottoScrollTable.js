import React, { Component } from 'react';
import '../assert/styles/style.scss'

class RisottoScrollTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { content, customClass } = this.props;
        var customClass = "tableFixHead " + customClass;
        return (
            <div class={customClass}>
                <table>
                    {content}
                </table>
            </div >
        )
    }
}

export default RisottoScrollTable;
