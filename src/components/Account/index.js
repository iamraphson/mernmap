/**
 * Created by Raphson on 9/28/16.
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';
import Auth from '../../utils/auth';
export default class EditIndex extends React.Component {
    constructor() {
        super();
        let user = JSON.parse(Auth.getUser());
        this.state = {
            displayImage: user.user_avi,
            fullName: user.fullname,
            hireStatus: user.hire_status,
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render(){
        return (
            <span>
                <NavBar />
                <div style={{minHeight: 580}} className="main-container">
                    <section className="header header-12">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 text-white">
                                    <h4 className="text-white">{this.state.fullName}</h4>
                                    <ul>
                                        <li><i className="fa fa-clock-o" /> Member since
                                            <span>2016-09-28</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="faq faq-1">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="faq">
                                        <img width={200} height={200} src={ this.state.displayImage }
                                             alt={this.state.fullName} className="img-rounded" />
                                    </div>
                                    <div className="faq">
                                        <h5>{this.state.fullName}</h5>
                                        <ul>
                                            <li><a target="_blank" href=""><i className="fa fa-github" /> GitHub</a></li>
                                            <li><a target="_blank" href=""><i className="fa fa-globe" /> Website / Blog</a></li>
                                        </ul>
                                        <br />
                                        <ul>
                                            {(this.state.hireStatus == 'yes') ?
                                            <li ><i className="fa fa-suitcase" /> Not Available for Hire</li>
                                                :
                                            <li><i className="fa fa-suitcase" /> Available for Hire</li> }
                                            <br />
                                        </ul>
                                        <ul>
                                            <li><i className="fa fa-project" /><a  className="btn btn-default">Share Project</a></li>
                                            <br />
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="faq">
                                        <h5>Tell Us About Yourself</h5>
                                        <p>bio</p>
                                    </div>
                                    <div className="faq">
                                        <h5>Location</h5>
                                        <div ng-controller="MapController">
                                            map oh
                                        </div>
                                    </div>
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