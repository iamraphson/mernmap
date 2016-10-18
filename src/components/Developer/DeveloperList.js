/**
 * Created by Raphson on 10/14/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class DeveloperList extends Component {
    constructor() {
        super();
    }

    render(){
        return (
            <div className="col-lg-2 col-md-3 col-sm-4 col-xs-5 team-profile">
                <div style={{textAlign: 'center'}}>
                    <Link to={ `/mern-developers/${this.props.developer.username}`}>
                        <img height={150} width={150} alt={this.props.developer.fullname}
                             src={this.props.developer.user_avi} />
                    </Link>
                </div>
                <div className="profile-name grid3">{this.props.developer.username}</div>
                <ul className="profile-social-icons">
                    <li>
                        <a target="_blank" href={this.props.developer.twitter_handle || '#'}>
                            <i className="fa fa-twitter-square" />
                        </a>
                    </li>
                    <div style={{display: 'inline-block', width: 10, height: 4}}></div>
                    <li>
                        <a target="_blank" href={this.props.developer.github_profile || '#'}>
                            <i className="fa fa-github-square" />
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}