import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class RisottoDropDown extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var { name, items } = this.props;
        return (
            <UncontrolledDropdown>
                <DropdownToggle caret>
                    {name}
                </DropdownToggle>
                <DropdownMenu>
                    {this.renderDropdownItem(items)}
                </DropdownMenu>
            </UncontrolledDropdown >
        );
    }

    renderDropdownItem = (items) => {
        var elements = [];
        for (var item of items) {
            elements.push(
                <DropdownItem>{item}</DropdownItem>
            )
        }
    }
}