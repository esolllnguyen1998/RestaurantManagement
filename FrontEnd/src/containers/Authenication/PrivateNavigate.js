import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import AppNavbar from '../../components/AppNavbar';
import { POSITION } from './constants';

class PrivateNavigate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access_token: sessionStorage.getItem('token'),
            position: sessionStorage.getItem('position'),
        };
    }

    render() {
        var { access_token, position } = this.state; 
        return (
            access_token && position
                ?
                <div>
                    <AppNavbar onClick={() => this.onLogout()} />
                    {this.showByRole(position)}
                </div>
                : <Redirect to='/login' />
        )
    }

    onLogout = () => {
        sessionStorage.removeItem('token');
        this.setState = { access_token: null };
        window.location.reload();
    }

    showByRole = (position) => {
        switch (position) {
            case POSITION.SERVE:
                return <Redirect to='/staff' />
            case POSITION.CHEF:
                return <Redirect to='/chef' />
            case POSITION.CASHIER:
                return <Redirect to='/cashier' />
            case POSITION.MANAGER:
                return <Redirect to='/manager' />
            default:
                return <Redirect to='/login' />
        }

    }
}

export default PrivateNavigate;
