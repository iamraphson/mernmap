/**
 * Created by Raphson on 10/22/16.
 */
import React from 'react';
import NavBar from './NavBar/index';
import Footer from './Footer/Index';
import { Link } from 'react-router';
import MyTextarea from './forms/Textarea';
import MyInput from './forms/Input';
import Formsy from 'formsy-react';
import ContactStore from '../stores/ContactStore';
import ContactAction from '../actions/ContactAction';

export default class Contact extends React.Component{
    constructor(){
        super();
        this.state = {
            canSubmit: false
        }
    }

    componentDidMount = () => {
        ContactStore.addChangeListener(this.handleReset, 'reset');
    }

    componentWillUnmount = () => {
        ContactStore.removeChangeListener(this.handleReset, 'reset');
    }

    handleSubmit = (data) => {
        console.log(data);
    }

    enableButton = () => {
        this.setState({ canSubmit: true });
    };

    disableButton = () => {
        this.setState({ canSubmit: false });
    };

    render(){
        return(
            <span>
                <NavBar />
                {/* Main container for Contact Page View */}
                <div style={{minHeight: 580}} className="main-container">
                    <section className="contact contact-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <h3>MAKE ENQUIRIES</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                                    <Formsy.Form name="contactForm" onInvalid={this.disableButton}
                                         onValidSubmit={this.handleSubmit} onValid={this.enableButton}>
                                        {/* Name Form Input */}
                                        <div className="form-group col-lg-12">
                                            <MyInput className="form-group" name="name" required
                                                     placeholder="Name...e.g Ayeni Olusegun"
                                                     validationError="Name is required." />
                                        </div>
                                        <div className="form-group col-lg-12">
                                            <MyInput className="form-group" name="email" validations="isEmail"
                                                     placeholder="Email...e.g nsegun5@gmail.com" required
                                                     validationError="Email is required." />
                                        </div>
                                        <div className="form-group">
                                            <MyTextarea className="form-group col-lg-12" rows="10" cols="50"
                                                required name="message" placeholder="Message"
                                                validationError="Message is required." />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" disabled={!this.state.canSubmit}
                                                className="form-control btn btn-block">Submit</button>
                                        </div>
                                    </Formsy.Form>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="social social-1 near-footer">
                        <div className="container">
                            <div className="row">
                                <div className="leader col-sm-12 text-center">
                                    <span>"Don’t worry if it doesn’t work right. <br className="visible-desktop" /> If everything did, you’d be out of a job.."</span>
                                    <h5 className="lead-author">- Mosher’s Law </h5>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/* End Main Container for Contact Page View */}
                <Footer />
            </span>
        );
    }
}