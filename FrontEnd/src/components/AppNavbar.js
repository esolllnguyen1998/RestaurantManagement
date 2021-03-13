import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { onClick } = this.props;
        return <Navbar color="dark" dark expand="md">
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink className="logout-button" onClick={onClick}>Đăng Xuất</NavLink>
                </NavItem>
            </Nav>
        </Navbar >
    }
}
