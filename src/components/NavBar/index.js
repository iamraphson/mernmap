/**
 * Created by Raphson on 9/22/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Link, hashHistory } from 'react-router';
import Auth from '../../utils/auth';

export default class Nav extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loggedIn: null,
            user: null
        };
    }

    componentDidMount() {
        this.setState({
            loggedIn: Auth.loggedIn(),
            user: Auth.getUser()
        });
    }

    handleLogoutResult = (e) => {
        e.preventDefault();
        this.setState({
            loggedIn: null,
            user: null
        });
        Auth.logout();
        hashHistory.push('/');
    }

    render(){
        return (
            <div className="nav-container">
                <nav className="nav-1 ">
                    <div className="navbar">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3 col-sm-6 col-xs-4">
                                    <Link to="/">
                                        <img className="logo" alt="Logo" src="img/google-pushpin-md.png" />
                                    </Link>
                                </div>
                                <div className="col-md-3 text-right col-sm-6 col-md-push-6 col-xs-8" >
                                    {!this.state.loggedIn ? (
                                        <ul className="menu">
                                            <li><Link to="/user/create">CREATE ACCOUNT</Link></li>
                                            <li><Link to="/auth/login">LOGIN</Link></li>
                                        </ul>
                                    ) : (
                                        <ul className="menu">
                                            <li className="has-dropdown">
                                                <a href="#">
                                                    <img className="header-img-rounded"
                                                         src={ JSON.parse(this.state.user).user_avi } />{' '}
                                                    { JSON.parse(this.state.user).username }

                                                    <span className="caret" />
                                                </a>
                                                <ul className="subnav">
                                                    <li><a href="/account"><i className="fa fa-user" />{'  '}My Profile</a></li>
                                                    <li><Link to="/account/edit"><i className="fa fa-pencil-square-o" />{'  '}
                                                        Edit Profile</Link></li>
                                                    <li><a href="/tutorial/create"><i className="fa fa-leanpub" /> {'  '}
                                                        Post MERN Tutorial </a></li>
                                                    <li className="divider" />
                                                    <li><a href="/#" style={{cursor: 'pointer'}}
                                                           onClick={this.handleLogoutResult}>
                                                        <i className="fa fa-sign-out" /> {'  '}
                                                        Logout</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    )}
                                    <div className="mobile-toggle">
                                        <div className="upper"></div>
                                        <div className="middle"></div>
                                        <div className="lower"></div>
                                    </div>
                                </div>
                                <div className="col-md-6 text-center col-md-pull-3 col-sm-12 col-xs-12">
                                    <ul className="menu">
                                        <li><Link to="/">HOME</Link></li>
                                        <li><a href="/mean-developers">MERN DEVELOPERS</a></li>
                                        <li><a href="/projects">PROJECTS</a></li>
                                        <li><a href="/jobs">JOBS</a></li>
                                        <li><a href="/tutorials">TUTORIALS</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}