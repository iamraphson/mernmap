/**
 * Created by Raphson on 10/10/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
import Auth from '../../utils/auth';
import JobStore from '../../stores/JobStore';
import JobActions from '../../actions/JobActions';
export default class Jobs extends Component {
    constructor() {
        super();
        this.state = {
            projects: null,
        }
    }

    componentDidMount() {
        JobActions.fetchAllJobs();
        JobStore.addChangeListener(this.handleJobsResult, 'fetchJobs');
    }

    componentWillUnmount(){
        JobStore.removeChangeListener(this.handleJobsResult, 'fetchJobs');
    }

    handleJobsResult = () => {
        let result = JobStore.getJobs();
        console.log(result);
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
                                    <h4>FULL STACK DEVELOPER JOBS ON THE PLANET</h4>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                    List goes here...
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 text-center">
                                    <Link className="btn btn-block btn-lg" to="/post-a-job">Post a Job</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="social social-1 near-footer">
                        <div className="container">
                            <div className="row">
                                <div className="leader col-sm-12 text-center">
                    <span>
                      <i className="fa fa-quote-left" />
                      Developers can only switch Jobs. They can never be Unemployed.
                      <i className="fa fa-quote-right" />
                    </span>
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