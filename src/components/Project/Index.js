/**
 * Created by Raphson on 10/6/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, hashHistory } from 'react-router';
import ProjectActions from '../../actions/ProjectActions';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
import Auth from '../../utils/auth';

export default class Project extends React.Component {
    constructor() {
        super();
        this.state = {
            token: Auth.getToken(),
        }
    }

    componentDidMount() {
        ProjectActions.fetchAuthUser(this.state.token);
        //ProjectStore.addChangeListener(this.handleShareProjectResult, 'shareProject');
    }

    componentWillUnmount(){
        //ProjectStore.removeChangeListener(this.handleShareProjectResult, 'shareProject');
    }

    render(){
        return (
            <span>
                <NavBar />
                <div style={{minHeight: 580}} className="main-container">
                    <section>
                        <div className="container">
                            <div style={{marginBottom: 15}} className="row">
                                <div className="col-sm-12 text-center">
                                    <h4>MERN STACK PROJECTS IN SPACE</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                                    <div className="thumbnail bootsnipp-thumb">
                                        <div>
                                            <p className="lead snipp-title text-center">
                                                <a style={{textTransform: 'capitalize'}} href="#">projectname</a>
                                            </p>
                                        </div>
                                        <div className="caption">
                                            <p><a style={{color: '#fff'}} className="btn btn-primary btn-lg btn-block" href="#">View</a></p>
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