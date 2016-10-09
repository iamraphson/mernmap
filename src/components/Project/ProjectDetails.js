/**
 * Created by Raphson on 10/8/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import ProjectActions from '../../actions/ProjectActions';
import ProjectStore from '../../stores/ProjectStore';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
import Auth from '../../utils/auth';
import marked from 'marked';
import TimeAgo from 'react-timeago';
import ReactDisqus from 'react-disqus';

export default class ProjectDetails extends Component {
    constructor() {
        super();
        this.state = {
            project: null,
        }
    }

    componentDidMount() {
        ProjectActions.fetchProject(this.props.params.slug);
        ProjectStore.addChangeListener(this.handleProjectResult, 'fetchProject');
    }

    componentWillUnmount(){
        ProjectStore.removeChangeListener(this.handleProjectResult, 'fetchProject');
    }

    handleProjectResult = () => {
        let result = ProjectStore.getProject();
        this.setState({
            project: result.data
        });
    }

    shareTwitter = (e) => {
        e.preventDefault();
        let name = this.state.project ? this.state.project.name : 'Loading..';
        let url = this.state.project ? this.state.project.url : 'Loading..';
        window.open(
            'https://twitter.com/share?url='+encodeURIComponent(url)+'&amp;text='
            + encodeURIComponent('Check Out This MERN Stack Project: ' + name)
            + '&amp;count=none/', 'twitter-share-dialog',
            'width=626,height=436,top='+((screen.height - 436) / 2)+',left='+((screen.width - 626)/2 ));
    }

    shareFacebook = (e) => {
        e.preventDefault();
        let name = this.state.project ? this.state.project.name : 'Loading..';
        let url = this.state.project ? this.state.project.url : 'Loading..';
        window.open(
            'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url) +'&amp;t='
            + encodeURIComponent('Check Out This MERN Stack Project: ' + name),'facebook-share-dialog',
            'width=626,height=436,top='+((screen.height - 436) / 2)+',left='+((screen.width - 626)/2 ));
    }

    render() {
        let desc = this.state.project ? this.state.project.description : 'Loading..';
        return (
            <span>
                <NavBar />
                <div style={{minHeight: 580}} className="main-container">
                    <section>
                        <div style={{backgroundColor: '#fff', padding: '60px 20px'}} className="listing">
                            <div data-ng-controller="ProjectController" className="row">
                                <div className="col-sm-8 columns project-board">
                                    <h3 style={{textTransform: 'capitalize'}}
                                        className="header">{this.state.project ? this.state.project.name : 'Loading..'}</h3>
                                    <br />
                                    <p dangerouslySetInnerHTML={{__html: marked(desc) }} />
                                    <span style={{fontStyle: 'italic'}} className="postedBy"> Added by
                                        <a href="/mean-developers/{{ projectDetails.postedBy }}"
                                           style={{color: '#aa0036'}}> @{this.state.project ?
                                        this.state.project.postedBy.username : 'Loading..'}</a></span>
                                    <ReactDisqus shortname="mernmap" identifier="123" />
                                </div>
                                <div className="col-sm-3 columns project-sidebar">
                                    <h6>Posted: <span className="time"><TimeAgo
                                    date={this.state.project ? new Date(this.state.project.postedOn) : new Date(1475956609492) }/> </span></h6>
                                    <br />
                                    <h6>Website: </h6>
                                    <p><a target="_blank"
                                          href={this.state.project ? this.state.project.url : 'Loading..'}>{
                                        this.state.project ? this.state.project.url : 'Loading..'}</a></p>
                                    <h6>Social Media Share: </h6>
                                    <br />
                                    <p>
                                        <a href="#" className="btn btn-info btn-lg" onClick={this.shareTwitter}
                                           style={{color: '#fff', marginLeft: '-10px'}} href="#">
                                            <i className="fa fa-twitter" /> Share on Twitter
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#" className="btn btn-lg btn-primary" onClick={this.shareFacebook}
                                           style={{color: '#fff', marginLeft: '-10px'}} href="#">
                                            <i className="fa fa-facebook" /> Share on Facebook
                                        </a>
                                    </p>
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
