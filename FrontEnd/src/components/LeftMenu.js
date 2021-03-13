import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React, { Component } from 'react';
import '../assert/styles/style.scss'

export default class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSelect: 0,
        }
    }
    render() {
        var { items } = this.props;
        var { onSelect } = this.state;

        return (
            <>
                <div class="sidebar">
                    {this.showItems(items)}
                </div>
                <div className="main-manage-staff">
                    {items[onSelect].component}
                </div>
            </>
        )
    }

    showItems = (items) => {
        var { onSelect } = this.state;
        var elements = [];
        for (var i = 0; i < items.length; i++) {
            let index = i;
            if (onSelect == i) {
                elements.push(
                    <a className="active">{items[i].name}</a>
                )
                continue;
            }
            elements.push(
                <a onClick={() => this.onSelectItem(index)}>{items[i].name}</a>
            )
        }
        return elements;
    }

    onSelectItem = (index) => {
        this.setState(
            { onSelect: index }
        )
    }
}
