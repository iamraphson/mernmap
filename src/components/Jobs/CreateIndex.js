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
import JobStore from '../../stores/JobStore';
import JobActions from '../../actions/JobActions';
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
        JobStore.addChangeListener(this.handlePostJobResult, 'postjob');
    }

    componentWillUnmount(){
        JobStore.removeChangeListener(this.handlePostJobResult, 'postjob');
    }

    handlePostJobResult = () => {
        let result = JobStore.getPostJobResult();
        Auth.checkAuthRequired(result);
        if(result.status == 500){
            Alert.error(result.data.message, { position: 'top-right',  effect: 'bouncyflip'});
        } else {
            Alert.success(result.data.message, { position: 'top-right',  effect: 'bouncyflip'});
            hashHistory.push('/jobs');
        }
    }

    enableButton = () => {
        this.setState({ canSubmit: true });
    }

    disableButton = () => {
        this.setState({ canSubmit: false });
    }

    handleSubmit = (data) => {
        var jobPayload = {
            title: data.title,
            description: data.description,
            company: data.company
        };
        JobActions.postJob(jobPayload, this.state.token);
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