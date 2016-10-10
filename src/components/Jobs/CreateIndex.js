/**
 * Created by Raphson on 10/9/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MyInput from '../forms/Input';
import MyTextarea from '../forms/Textarea';
import Formsy from 'formsy-react';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
import Auth from '../../utils/auth';

export default class Create extends Component {
    constructor() {
        super();
        this.state = {
            canSubmit: false
        }
    }

    enableButton = () => {
        this.setState({ canSubmit: true });
    }

    disableButton = () => {
        this.setState({ canSubmit: false });
    }

    handleSubmit = (data) => {
        console.log(data);
    }

    render() {
        return (
            <span>
                <NavBar />
                <div style={{minHeight: 580}} className="main-container">
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <h3> POST A DEVELOPER JOB TODAY </h3>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div style={{margin: '0 auto'}} className="col-md-8 col-md-offset-2">
                                    <Formsy.Form  className="col-md-10"  onValidSubmit={this.handleSubmit}
                                          onValid={this.enableButton} onInvalid={this.disableButton} name="jobForm">
                                        {/* Job Title Form Input */}
                                        <MyInput className="form-group" name="title" title="Job Title" required
                                             validations="minLength:2" validationError="Job Title is required." />
                                        {/* Job Description Form Input */}
                                        <MyTextarea className="form-group" title="Job Description *Markdown Supported"
                                            rows="12" cols="50" name="description" validations="minLength:2" required
                                            validationError="Description is required."  />

                                        {/* Company Form Input */}
                                        <MyInput className="form-group" name="company" title="Company" required
                                             validations="minLength:2" validationError="Company is required."
                                             />
                                        {/* Submit Job Details Button */}
                                        <div className="form-group">
                                            <button disabled={!this.state.canSubmit} id="submit-btn" type="submit"
                                                className="form-control btn btn-lg">Submit Job Details</button>
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
                                    <span>"Learn By Doing. Learn More By Teaching"</span>
                                    <h5 className="lead-author">- Prosper Otemuyiwa</h5>
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