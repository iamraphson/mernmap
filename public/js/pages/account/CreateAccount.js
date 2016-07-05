/**
 * Created by Raphson on 7/3/16.
 */
import React , {Component, PropTypes, findDOMNode} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import set from 'lodash.set';
import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Request from 'superagent'
import Notifications, {notify} from 'react-notify-toast';
import RequestPromised from 'superagent-as-promised';

import Footer from './../Footer';
import Nav from './../Nav';

class CreateAccount extends React.Component{

    constructor(props) {
        super(props);
        this.validatorTypes = {
            username:  Joi.string().alphanum().min(3).max(30).required().label('Username'),
            fullname:  Joi.string().required().label('Full Name'),
            email:  Joi.string().required().email().label('Email Address'),
            address:  Joi.string().required().label('Address'),
            password: Joi.string().required().regex(/[a-zA-Z0-9]{3,30}/).label('Password'),
            github_url:  Joi.string().required().label('Github URL'),
        };
        this.getValidatorData = this.getValidatorData.bind(this);
        this.renderHelpText = this.renderHelpText.bind(this);
        this.getClasses = this.getClasses.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        RequestPromised(Request);
    }

    getValidatorData() {
        //console.log(this.refs.username);
        //return this.props;
        return {
            username: this.refs.username.value,
            fullname: this.refs.fullname.value,
            email : this.refs.email.value,
            password : this.refs.password.value,
            website : this.refs.website.value,
            github_url : this.refs.github_url.value,
            address : this.refs.address.value,
        };
    }

    render(){
        return (
            <span>
                <Nav />
                <Notifications />
                {/* Main container for User creation Page View */}
                  <div className="main-container" style={{minHeight: 580}}>
                      <section className="faq faq-1">
                          <div className="container">
                              <div className="col-md-6">
                                  <h3 className="dark-grey">Your Information</h3>
                                  <form name="signUpForm" onSubmit={this.onSubmit}>
                                      <div className="col-lg-12">
                                          {/* Username Form Input */}
                                          <div className="form-group col-lg-6">
                                              <label htmlFor="username">Username</label>
                                              <input className="form-control" placeholder="username e.g iamraphson"
                                                     name="username" ref="username" value={this.props.username} type="text"
                                                     id="username" />
                                              {this.renderHelpText(this.props.getValidationMessages('username'))}
                                          </div>
                                          {/* Name Form Input */}
                                          <div className="form-group col-lg-6">
                                              <label htmlFor="name">Name</label>
                                              <input className="form-control" placeholder="fullname e.g Ayeni Olusegun"
                                                     name="fullname" ref="fullname"
                                                     value={this.props.fullname} type="text" id="fullname"  />
                                              {this.renderHelpText(this.props.getValidationMessages('fullname'))}
                                          </div>
                                      </div>
                                      <div className="col-lg-12">
                                          {/* Email Form Input */}
                                          <div className="form-group col-lg-6">
                                              <label htmlFor="email">Email Address</label>
                                              <input className="form-control"  placeholder="email e.g nsegun5@gmail.com"
                                                     name="email" type="email" ref="email" id="email" value={this.props.email}  />
                                              {this.renderHelpText(this.props.getValidationMessages('email'))}
                                          </div>
                                          {/* Password Form Input */}
                                          <div className="form-group col-lg-6">
                                              <label htmlFor="password">Password</label>
                                              <input className="form-control" placeholder="password" name="password"
                                                     type="password" id="password" ref="password" value={this.props.passwords}  />
                                              {this.renderHelpText(this.props.getValidationMessages('passwords'))}
                                          </div>
                                      </div>
                                      <div className="col-lg-12">
                                          {/* Website Form Input */}
                                          <div className="form-group col-lg-6">
                                              <label htmlFor="website">Website / Blog</label> <br />
                                              <small>(Starting with http:// or https://)</small>
                                              <input className="form-control" placeholder="e.g. http://www.mernmap.com"
                                                     name="website" type="text" ref="website" id="website" />
                                          </div>
                                          {/* Github_url Form Input */}
                                          <div className="form-group col-lg-6">
                                              <label htmlFor="github_url">GitHub Profile</label> <br />
                                              <small>(Starting with http:// or https://)</small>
                                              <input className="form-control" placeholder="e.g. https://github.com/iamraphson"
                                                     name="github_url" type="text" ref="github_url"
                                                     id="github_url" value={this.props.github_url}  />
                                              {this.renderHelpText(this.props.getValidationMessages('github_url'))}
                                          </div>
                                      </div>
                                      <div className="col-lg-12">
                                          {/* Address Form Input */}
                                          <div className="form-group col-lg-12">
                                              <label htmlFor="address">Address</label> <small>(For the map)</small>
                                              <input className="form-control" value={this.props.address}
                                                     placeholder="e.g. Class 7, Herbert Macaulay, Sabo Yaba, Lagos,
                                                     Nigeria" name="address" ref="address" type="text" id="address"  />
                                              {this.renderHelpText(this.props.getValidationMessages('address'))}
                                          </div>
                                      </div>
                                      {/* Sign up Form Input */}
                                      <div className="form-group col-lg-6">
                                          <button className="form-control btn btn-lg" type="submit">Sign Up</button>
                                      </div>
                                  </form>
                              </div>
                              <div className="col-md-6">
                                  <h3 className="dark-grey">Sign up now for <strong>FREE</strong></h3>
                                  <ul className="list-unstyled" style={{lineHeight: 2}}>
                                      <li><span className="fa fa-check text-success" /> Place yourself on the map</li>
                                      <li><span className="fa fa-check text-success" /> Get tons of resources</li>
                                      <li><span className="fa fa-check text-success" /> Save your favorites</li>
                                      <li><span className="fa fa-check text-success" /> Be a part of the community</li>
                                      <li><span className="fa fa-check text-success" /> Learn</li>
                                      <li><Link to="/page/about"><u>Read more</u></Link></li>
                                  </ul>
                              </div>
                          </div>
                      </section>
                  </div>
                {/* End Main Container for User creation Page View */}
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
                Request.post('/api/register')
                    .send({
                        username: this.refs.username.value,
                        fullname: this.refs.fullname.value,
                        email : this.refs.email.value,
                        password : this.refs.password.value,
                        website : this.refs.website.value,
                        github_profile : this.refs.github_url.value,
                        address : this.refs.address.value,
                    })
                    .end(function(err, res) {
                        if (err || !res.ok) {
                             console.log(res.body);
                             notify.show(res.body.message, 'error');
                        } else {
                            notify.show(res.body.message);
                            hashHistory.push('/auth/login');
                        }
                    });

            }
        };
        this.props.validate(onValidate);
    }
}

export default validation(strategy)(CreateAccount);