/**
 * Created by Raphson on 10/10/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
export default class Jobs extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div style={{minHeight: 580}} className="main-container">
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                <h4>FULL STACK DEVELOPER JOBS ON THE PLANET</h4>
                            </div>
                        </div>
                        <br />
                        <div ng-controller="JobsController" className="row">
                            <div className="col-md-12">
                                <div className="bs-callout" ng-repeat="jobs in allJobs">
                                    <h4><i className="fa fa-suitcase" /> Job title</h4>
                                    <p>Jobs Description</p>
                                    <p>
                                        Posted by <span className="btn-info badge">Company Name</span>
                                        <small><em className="time" />10/10/2016</small>
                                    </p>
                                </div>
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
        );
    }
}