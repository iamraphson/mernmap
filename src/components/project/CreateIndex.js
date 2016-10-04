/**
 * Created by Raphson on 10/4/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
export default class Create extends Component {

    constructor() {
        super();
    }

    render(){
        return (
            <div style={{width: 600}}>
                <div style={{backgroundColor: '#aa0036'}} className="modal-header">
                    <h5 style={{color: '#fff'}} className="modal-title text-center">Share MERN Stack Projects</h5>
                </div>
                <div style={{padding: '3%'}} className="modal-body">
                    <form name="createProjectForm" style={{width: '100%'}}>
                        <div className="form-group">
                            <label htmlFor="username">Project Name</label>
                            <input type="text" id="name" name="name" placeholder="name e.g Meanmap"
                                   className="form-control input-lg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Project Url <em>( Append http(s):// )</em></label>
                            <input type="url" id="url" name="url" placeholder="url e.g http://meanmap.com"
                                   className="form-control input-lg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Project Description <em>*Markdown Supported</em></label>
                            <textarea id="description" name="description" placeholder="Description e.g Meanmap is.."
                                      rows={5} className="form-control input-lg" />

                        </div>
                        <p>
                            <button type="submit" id="submit-btn" className="btn btn-default btn-lg col-md-6"
                                    >Share</button>
                            <button style={{color: '#fff'}} onClick={this.props.onClose}
                                    className="btn btn-danger btn-lg col-md-6">Cancel</button>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}