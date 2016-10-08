/**
 * Created by Raphson on 10/7/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class ProjectList extends Component {
    constructor() {
        super();
    }

    render(){
        return (
            <div className="thumbnail bootsnipp-thumb">
                <div>
                    <p className="lead snipp-title text-center">
                        <Link style={{textTransform: 'capitalize'}}
                              to={ `/projects/featured/${this.props.project.slug}`}>{this.props.project.name}</Link>
                    </p>
                </div>
                <div className="caption">
                    <p><Link style={{color: '#fff'}} className="btn btn-primary btn-lg btn-block"
                          to={ `/projects/featured/${this.props.project.slug}`}>View</Link></p>
                </div>
            </div>
        );
    }
}