/**
 * Created by Raphson on 9/24/16.
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import Alert from 'react-s-alert';
import MyInput from '../forms/Input';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';


export default class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            canSubmit: false
        }
    }

    handleLogin = (data) => {
        alert(JSON.stringify(data, null, 4));
    }

    enableButton = () => {
        this.setState({ canSubmit: true });
    };

    disableButton = () => {
        this.setState({ canSubmit: false });
    };

    render(){
        return (
            <span>
                {/* Main container for Login Page View */}
                <div className="main-container" style={{minHeight: 580}}>
                    <section className="faq faq-1">
                        <div className="container">
                            <div className="col-md-6">
                                <Formsy.Form onValidSubmit={this.handleLogin} onValid={this.enableButton}
                                             onInvalid={this.disableButton}>
                                    <MyInput className="form-group col-lg-6" name="email" title="Email"
                                             placeholder="e.g johndoe@gmail.com" validations="isEmail"
                                             validationError="Email is required." required  />

                                    <MyInput className="form-group col-lg-6" name="password" title="Password"
                                             placeholder="Your Password" type="password" required
                                             validationError="Password is required."   />

                                    <div className="form-group col-lg-12">
                                        <div className="form-group">
                                            <button className="form-control btn btn-block" type="submit"
                                                disabled={!this.state.canSubmit}>Sign in</button>
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <a href="/reset-password" className="form-control btn btn-block">Reset Password</a>
                                        </div>
                                    </div>
                                </Formsy.Form>
                            </div>
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
            </span>
        );
    }
}