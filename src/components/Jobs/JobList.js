/**
 * Created by Raphson on 10/12/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class JobList extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="bs-callout">
                <h4><i className="fa fa-suitcase" /> Job title</h4>
                <p>Jobs Description</p>
                <p>
                    Posted by <span className="btn-info badge">Company Name</span>
                    <small><em className="time" />10/10/2016</small>
                </p>
            </div>
        );
    }
}