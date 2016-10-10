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
                                    <form data-ng-submit="createJob()" name="jobForm">
                                        {/* Job Title Form Input */}
                                        <div className="form-group">
                                            <label htmlFor="title">Job Title</label>
                                            <input type="text" required id="title" name="title" data-ng-model="job.title" style={{width: '150%'}} className="form-control input-lg" />

                                        </div>
                                        {/* Job Description Form Input */}
                                        <div className="form-group">
                                            <label htmlFor="content">Job Description <em>*You may write in Markdown</em></label>
                                            <textarea required rows={12} cols={50} name="description" data-ng-model="job.description" style={{width: '150%'}} className="form-control" defaultValue={""} />
                                        </div>
                                        {/* Company Form Input */}
                                        <div className="form-group">
                                            <label htmlFor="content">Company</label>
                                            <input type="text" required id="title" name="company" data-ng-model="job.company" style={{width: '150%'}} className="form-control input-lg" />

                                        </div>
                                        {/* Submit Job Details Button */}
                                        <div className="form-group">
                                            <button data-ng-disabled="jobForm.$invalid" style={{width: '150%'}} id="submit-btn" type="submit" className="form-control btn btn-lg">Submit Job Details</button>
                                        </div>
                                    </form>
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