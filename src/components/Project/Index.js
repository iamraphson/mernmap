/**
 * Created by Raphson on 10/6/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, hashHistory } from 'react-router';
import ProjectActions from '../../actions/ProjectActions';
import ProjectStore from '../../stores/ProjectStore';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
import Auth from '../../utils/auth';
import ProjectList from './ProjectList';

export default class Project extends React.Component {
    constructor() {
        super();
        this.state = {
            token: Auth.getToken(),
            projects: null,
        }
    }

    componentDidMount() {
        ProjectActions.fetchAllProjects(this.state.token);
        ProjectStore.addChangeListener(this.handleProjectsResult, 'fetchProjects');
    }

    componentWillUnmount(){
        ProjectStore.removeChangeListener(this.handleProjectsResult, 'fetchProjects');
    }

    handleProjectsResult = () => {
        let result = ProjectStore.getProjects();
        console.log(result);
        if(result.status == 200){
            this.setState({
                projects: result.data
            });
        }
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
                                    {this.state.projects
                                        ? this.state.projects.map((project, i) => {
                                            return (
                                                <ProjectList project={project} key={i} />
                                            )
                                        })
                                        : <p>Loading...</p>
                                    }
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