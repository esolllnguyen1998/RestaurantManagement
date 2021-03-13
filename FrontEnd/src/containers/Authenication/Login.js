import React, { Component } from 'react';
import '../../assert/styles/login.scss';
import { Button, Form } from 'react-bootstrap';
import { requestApiLogin } from './redux/actions';
import { connect } from 'react-redux';
import PrivateNavigate from './PrivateNavigate';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isFail: false,
            isLoading: false
        };
    }
    onLogin = (event) => {
        event.preventDefault();

        this.setState({ isLoading: true });
        if (this.state.username != null && this.state.password != null) {
            this.props.requestApiLogin({ username: this.state.username, password: this.state.password });
        }
    }

    onSaveUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    onSavePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    componentWillReceiveProps(nextProps, prevState) {  
        this.setState({ isLoading: false });
        if (nextProps.data.Access_Token) {
            sessionStorage.setItem("token", nextProps.data.Access_Token);
            sessionStorage.setItem("position", nextProps.data.userInfor.position);
            sessionStorage.setItem("name", nextProps.data.userInfor.name);
        }
        else if(nextProps.data.isFail === true) {   
            this.setState({ isFail: true });
            setTimeout(() => this.setState({ isFail: false }), 1500);
        }
    }

    render() {
        var { data } = this.props;

        if (data && data.Access_Token) {
            return <PrivateNavigate />
        }

        return (
            < div className="risotto-container" style={{ background: 'teal'}} >
                <div className='containerForm'> 
                    <form className={(this.state.isLoading?  'loading ' : '') + (this.state.isFail? 'loginForm shake ' : 'loginForm ')} 
                        onSubmit={this.onLogin}>
                            <h3 className='titleForm'>Đăng nhập để truy cập hệ thống</h3>
                            <div>
                                <label className="shadow-text">Tài khoản: </label>
                                <input type='text' onChange={e => this.onSaveUsername(e)} />
                            </div>

                            <div>
                                <label  className="shadow-text">Mật khẩu: </label>
                                <input type='password' onChange={e => this.onSavePassword(e)} />
                            </div>

                            <div>
                                <input type='submit' value='Log in'/>
                            </div>
                    </form>
                </div> 
            </div >
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        requestApiLogin: (payload) => dispatch(requestApiLogin(payload)),
    }
}

const mapStateToProps = state => ({ data: state.loginReduder });

export default connect(mapStateToProps, mapDispatchToProps)(Login);
