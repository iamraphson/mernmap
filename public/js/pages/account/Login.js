/**
 * Created by Raphson on 7/3/16.
 */
import React , {Component, PropTypes, findDOMNode} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, Link } from 'react-router';
import set from 'lodash.set';
import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Request from 'superagent'
import Notifications, {notify} from 'react-notify-toast';
import RequestPromised from 'superagent-as-promised';
import auth from './../auth/auth'

import Footer from './../Footer';
import Nav from './../Nav';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.validatorTypes = {
            email:  Joi.string().required().email().label('Email Address'),
            password: Joi.string().required().label('Password')
        };

        this.getValidatorData = this.getValidatorData.bind(this);
        this.renderHelpText = this.renderHelpText.bind(this);
        this.getClasses = this.getClasses.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        RequestPromised(Request);
    }

    getValidatorData() {
        return {
            email: this.refs.email.value,
            password: this.refs.password.value
        };
    }

    render(){
        return (
            <span>
                <Nav />
                <Notifications />
                {/* Main container for Login Page View */}
                <div className="main-container" style={{minHeight: 580}}>
                    <section className="faq faq-1">
                        <div className="container">
                            <div className="col-md-6">
                                <form name="loginForm" onSubmit={this.onSubmit}>
                                    <div className="form-group col-lg-6">
                                        <label htmlFor="email">Email:</label>
                                        <input className="form-control" name="email" type="email" id="email"
                                               placeholder="e.g johndoe@gmail.com" ref="email" value={this.props.email} />
                                        {this.renderHelpText(this.props.getValidationMessages('email'))}
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label htmlFor="password">Password:</label>
                                        <input className="form-control" name="password" type="password" id="password"
                                               placeholder="e.g mypassword" ref="password" value={this.props.password}  />
                                        {this.renderHelpText(this.props.getValidationMessages('password'))}
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <div className="form-group">
                                            <button className="form-control btn btn-block" type="submit">Sign in</button>
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

    renderHelpText(message) {
        return (
            <span className='help-block has-error'>{message}</span>
        );
    }

    getClasses(field) {
        return classnames({
            'form-group': true,
            'has-error': !this.props.isValid(field)
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const onValidate = (error) => {
            if (error) {
                //alert('form has errors; do not submit');
            } else {
               Request.post('/api/login')
                    .send({
                        email : this.refs.email.value,
                        password : this.refs.password.value,
                    })
                    .end(function(err, res) {
                        console.log(res.body);
                        if (err || !res.ok) {
                            console.log(res.body);
                            notify.show(res.body.message, 'error');
                        } else {
                            auth.setToken(res.body)
                            hashHistory.push('/');
                        }
                    });

            }
        };
        this.props.validate(onValidate);
    }
}

export default validation(strategy)(Login);