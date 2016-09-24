/**
 * Created by Raphson on 9/24/16.
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import Alert from 'react-s-alert';
import MyInput from '../forms/Input';
import MyTextarea from '../forms/Textarea';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

export default class SignUp extends React.Component{

    constructor(){
        super();
        this.state = {
            username: null,
            name: null,
            email: null,
            password: null,
            website: null,
            github: null,
            address: null,
            canSubmit: false
        }
    }

    componentDidMount = () => {
        UserStore.addChangeListener(this.handleSignup, 'signup');
    }

    componentWillUnmount = () => {
        UserStore.removeChangeListener(this.handleSignup, 'signup');
    }

    handleSignup = () => {
        let data = UserStore.getSignupResult();
        if(data.success){
            Alert.success(data.message, { position: 'top-right' });
            hashHistory.push('/');
        } else {
            Alert.error(data.Error, { position: 'top-right' });
        }
    }

    enableButton = () => {
        this.setState({ canSubmit: true });
    };

    disableButton = () => {
        this.setState({ canSubmit: false });
    };

    handleSubmit = (data) => {
        let userPayload = {
            username: data.username,
            fullname: data.fullname,
            email : data.email,
            password : data.password,
            website : data.website,
            github_profile : data.github_url,
            address : data.address,
        };
        UserActions.signup(userPayload);

    };

    render(){
        return(
            <span>
                <div className="main-container" style={{minHeight: 580}}>
                    <section className="faq faq-1">
                        <div className="container">
                            <div className="col-md-6">
                                <h3 className="dark-grey">Your Information</h3>
                                <Formsy.Form onValidSubmit={this.handleSubmit} onValid={this.enableButton}
                                             onInvalid={this.disableButton}>
                                    <div className="col-lg-12">
                                        {/* Username Form Input */}
                                        <MyInput className="form-group col-lg-6" name="username" title="Username"
                                                 placeholder="username e.g iamraphson" validations="minLength:1"
                                                 validationError="Username is required."  />
                                        {/* Name Form Input */}
                                        <MyInput className="form-group col-lg-6" name="fullname" title="Name"
                                                 placeholder="fullname e.g Ayeni Olusegun" validations="minLength:1"
                                                 validationError="Full name is required."/>
                                    </div>

                                    <div className="col-lg-12">
                                        {/* Email Form Input */}
                                        <MyInput className="form-group col-lg-6" name="email" title="Email Address"
                                                 placeholder="email e.g nsegun5@gmail.com" validations="isEmail"
                                                 validationError="Email is required." required />

                                        {/* Password Form Input */}
                                        <MyInput className="form-group col-lg-6" name="password" title="Password"
                                                 type="password" validationError="Password is required."
                                                 validations="minLength:5" required />
                                    </div>
                                    <div className="col-lg-12">
                                        {/* Website Form Input */}
                                        <MyInput className="form-group col-lg-6" name="website"
                                                 title="Website / Blog (Starting with http:// or https://)"
                                                  />
                                        {/* Github_url Form Input */}
                                        <MyInput className="form-group col-lg-6" name="github_url" required
                                                 title="GitHub Profile (Starting with http:// or https://)"
                                                 validationError="Github Url is required." validations="isUrl"  />

                                    </div>
                                    <div className="col-lg-12">
                                        {/* Address Form Input */}
                                        <MyTextarea className="form-group col-lg-12" title="Address (For the map)"
                                                placeholder="e.g. Class 7, Herbert Macaulay, Sabo Yaba, Lagos, Nigeria"
                                                name="address" validationError="Address is required." required />
                                    </div>
                                    {/* Sign up Form Input */}
                                    <div className="form-group col-lg-6">
                                        <button className="form-control btn btn-lg" type="submit"
                                                disabled={!this.state.canSubmit}>Sign Up</button>
                                    </div>
                                </Formsy.Form>
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
            </span>
        );
    }
}