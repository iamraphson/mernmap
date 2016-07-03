/**
 * Created by Raphson on 7/3/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';


import Footer from './../Footer';
import Nav from './../Nav';

export default class Featured extends React.Component{
    render(){
        return (
            <span>
                <Nav />
                {/* Main container for Login Page View */}
                <div className="main-container" style={{minHeight: 580}}>
                    <section className="faq faq-1">
                        <div className="container">
                            <div className="col-md-6">
                                <form name="loginForm">
                                    <div className="form-group col-lg-6">
                                        <label htmlFor="email">Email:</label>
                                        <input className="form-control" name="email" type="email" ng-model="user.email" id="email" placeholder="e.g johndoe@gmail.com" required />

                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label htmlFor="password">Password:</label>
                                        <input className="form-control" name="password" type="password" defaultValue id="password" placeholder="e.g mypassword" required />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <div className="form-group">
                                            <button className="form-control btn btn-block" type="submit" ng-disabled="loginForm.$invalid">Sign in</button>
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <a href="/reset-password" className="form-control btn btn-block">Reset Password</a>
                                        </div>
                                    </div>
                                </form></div>
                            <div className="col-md-6">
                                <h3 className="dark-grey">Sign up now for <strong>FREE</strong></h3>
                                <ul className="list-unstyled" style={{lineHeight: 2}}>
                                    <li><span className="fa fa-check text-success" /> Place yourself on the map</li>
                                    <li><span className="fa fa-check text-success" /> Get to Share Interesting Projects with other developers</li>
                                    <li><span className="fa fa-check text-success" /> Get to Share Tutorials</li>
                                    <li><span className="fa fa-check text-success" /> Get to Know mean developers around you</li>
                                    <li><span className="fa fa-check text-success" /> Get Connected</li>
                                    <li><span className="fa fa-check text-success" /> Get Hired Today</li>
                                    <li><span className="fa fa-check text-success" /> Become an Alien and reside on the Mean Planet</li>
                                    <li><span className="fa fa-check text-success" /> Be a part of the community</li>
                                    <li><Link to="/page/about"><u>Read more</u></Link></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className="social social-1 near-footer">
                        <div className="container">
                            <div className="row">
                                <div className="leader col-sm-12 text-center">
                                    <span>
                                      <i className="fa fa-quote-left" />
                                      A Framework/Technology is only as good as it's community
                                      <i className="fa fa-quote-right" />
                                    </span>
                                    <h5 className="lead-author">- Prosper Otemuyiwa</h5>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/* End Main Container for Login Page View */}
                <Footer />
            </span>
        )
    }
}