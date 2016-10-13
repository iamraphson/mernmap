/**
 * Created by Raphson on 10/12/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import TimeAgo from 'react-timeago';
import marked from 'marked';

export default class JobList extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="bs-callout">
                <h4><i className="fa fa-suitcase" /> {this.props.job.title}</h4>
                <p dangerouslySetInnerHTML={{__html: marked(this.props.job.description) }} />
                <p>
                    Posted by <span className="btn-info badge">{ this.props.job.company }</span>
                    <small> <em className="time" /><TimeAgo date={new Date(this.props.job.registered_on) }/> </small>
                </p>
            </div>
        );
    }
}