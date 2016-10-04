/**
 * Created by Raphson on 10/4/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MyInput from '../forms/Input';
import MyTextarea from '../forms/Textarea';
import Formsy from 'formsy-react';

export default class Create extends Component {

    constructor() {
        super();
        this.state = {
            canSubmit: false
        }
    }

    enableButton = () => {
        this.setState({ canSubmit: true });
    }

    disableButton = () => {
        this.setState({ canSubmit: false });
    }

    handleSubmit = (data) => {
        this.props.onDataSubmit(data);
    }

    render(){
        return (
            <div style={{width: 600}}>
                <div style={{backgroundColor: '#aa0036'}} className="modal-header">
                    <h5 style={{color: '#fff'}} className="modal-title text-center">Share MERN Stack Projects</h5>
                </div>
                <div style={{padding: '3%'}} className="modal-body">
                    <Formsy.Form name="createProjectForm" style={{width: '100%'}} onValidSubmit={this.handleSubmit}
                                 onValid={this.enableButton} onInvalid={this.disableButton}>
                        <MyInput className="form-group" name="project_name" title="Project Name"
                             placeholder="Project Name e.g MERNMAP" validations="minLength:1" required
                             validationError="Project Name is required." />

                        <MyInput className="form-group" name="project_url" title="Project Url ( Append http(s):// )"
                                 placeholder="url e.g http://mernmap.com" validations="isUrl" required
                                 validationError="Project URL is required." />

                        <MyTextarea className="form-group" title="Project Description *Markdown Supported"
                                    placeholder="Description e.g Meanmap is.." rows="5" name="project_description"
                                    validationError="Description is required." required />
                        <p>
                            <button type="submit" id="submit-btn" disabled={!this.state.canSubmit}
                                    className="btn btn-default btn-lg col-md-6">Share</button>

                            <button style={{color: '#fff'}} onClick={this.props.onClose}
                                    className="btn btn-danger btn-lg col-md-6">Cancel</button>
                        </p>
                    </Formsy.Form>
                </div>
            </div>
        )
    }
}