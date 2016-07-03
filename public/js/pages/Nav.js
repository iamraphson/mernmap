/**
 * Created by Raphson on 7/3/16.
 */
/**
 * Created by Raphson on 7/2/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class Nav extends React.Component{
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
                                    <ul className="menu">
                                        <li><Link to="/user/create">CREATE ACCOUNT</Link></li>
                                        <li><Link to="/auth/login">LOGIN</Link></li>
                                    </ul>
                                    <div className="mobile-toggle">
                                        <div className="upper"></div>
                                        <div className="middle"></div>
                                        <div className="lower"></div>
                                    </div>
                                </div>
                                <div className="col-md-6 text-center col-md-pull-3 col-sm-12 col-xs-12">
                                    <ul className="menu">
                                        <li><a href="/">HOME</a></li>
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