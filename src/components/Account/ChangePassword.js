/**
 * Created by Raphson on 10/22/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MyInput from '../forms/Input';
import Formsy from 'formsy-react';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
import Auth from '../../utils/auth';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';
import { hashHistory } from 'react-router';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

export default class Create extends Component {
    constructor() {
        super();
        this.state = {
            canSubmit: false,
            token: Auth.getToken(),
        }
    }

    componentDidMount() {
        UserStore.addChangeListener(this.handleChangePasswordResult, 'change');
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this.handleChangePasswordResult, 'change');
    }

    handleChangePasswordResult = () => {
        let result = UserStore.getChangeResult();
        Auth.checkAuthRequired(result);
        if(result.status == 404){
            Alert.error(result.data.message, { position: 'top-right',  effect: 'bouncyflip'});
        }  else {
            if(result.data.success){
                Alert.success(result.data.message, { position: 'top-right',  effect: 'bouncyflip'});
                hashHistory.push('account');
            } else {
                Alert.error(result.data.message, { position: 'top-right',  effect: 'bouncyflip'});
            }
        }
    };

    enableButton = () => {
        this.setState({ canSubmit: true });
    }

    disableButton = () => {
        this.setState({ canSubmit: false });
    }

    handleSubmit = (data) => {
        var changePayload = {
            oldPassword: data.oldpassword,
            newPassword: data.newpassword
        };
        UserActions.changePassword(changePayload, this.state.token);
    };

    render() {
        return (
            <span>
                <NavBar />
                <div style={{minHeight: 580}} className="main-container">
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <h3> Change Password </h3>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div style={{margin: '0 auto'}} className="col-md-8 col-md-offset-2">
                                    <Formsy.Form  className="col-md-10"  onValidSubmit={this.handleSubmit}
                                          onValid={this.enableButton} onInvalid={this.disableButton}>

                                        <MyInput className="form-group" name="oldpassword" title="Old Password" required
                                                 validations="minLength:2" validationError="Old Password is required."
                                                 type="password"
                                        />

                                        <MyInput className="form-group" name="newpassword" title="New Password" required
                                                 validations="minLength:5" validationError="New Password is required."
                                                 type="password"
                                        />

                                        <MyInput className="form-group" name="confirmpassword"
                                                 title="Confirm Password" required type="password"
                                                 validations="equalsField:newpassword"
                                                 validationError="Confirm new password "
                                        />

                                        <div className="form-group">
                                            <button disabled={!this.state.canSubmit} id="submit-btn" type="submit"
                                                    className="form-control btn btn-lg">Submit</button>
                                        </div>
                                    </Formsy.Form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </span>
        );
    }
}