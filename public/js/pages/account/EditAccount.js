/**
 * Created by Raphson on 7/3/16.
 */
import React , {Component, PropTypes, findDOMNode} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, Link } from 'react-router';
import set from 'lodash.set';
import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Request from 'superagent'
import Notifications, {notify} from 'react-notify-toast';
import RequestPromised from 'superagent-as-promised';
import auth from './../auth/auth'
import async from 'async';
import Dropzone from 'react-dropzone';



import Footer from './../Footer';
import Nav from './../Nav';

class EditAccount extends React.Component{

    constructor(props) {
        super(props);
        this.validatorTypes = {
            fullname:  Joi.string().required().label('Full Name'),
            address:  Joi.string().required().label('Address'),
            github_profile:  Joi.string().required().label('Github URL'),
            bio: Joi.string().required().label('Bio')
        };

        this.getValidatorData = this.getValidatorData.bind(this);
        this.renderHelpText = this.renderHelpText.bind(this);
        this.getClasses = this.getClasses.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.state = {
            loggedIn: auth.loggedIn(),
            token: auth.getToken(),
            fullname: 'cool',
            currentUser: {
                fullname: '',
                address: '',
                website: '',
                twitter_handle: '',
                github_profile: '',
                bio: '',
                hire_status: '',
            },
            data_uri: null,
            files: []
        };
        RequestPromised(Request);
    }

    handleFile(e) {
        var reader = new FileReader();
        var file = e.target.files[0];
        reader.onload = function(upload) {
            this.setState({
                data_uri: upload.target.result
            });
            console.log(this.state.data_uri)
        }.bind(this);

        reader.readAsDataURL(file);
    }

    getValidatorData() {
        return {
            fullname: this.refs.fullname.value,
            address: this.refs.address.value,
            github_profile: this.refs.github_profile.value,
            bio: this.refs.bio.value,
        };
    }

    componentDidMount(){
        Request.get('/api/me')
            .set('Authorization', 'Bearer ' + this.state.token)
            .end(function(err, res) {
                //console.log(JSON.stringify(res.body));
                if (err || !res.ok) {
                    console.log(JSON.stringify(res.body));
                } else {
                    this.setState({
                        currentUser: res.body
                    });
                }
            }.bind(this));
    }

    onChange(field) {
        return event => {
            this.setState(set(this.state, field, event.target.value));
        };
    }

    onDrop(files) {
        console.log('Received files: ', files);
        this.setState({
            files: files
        });
    }

    render(){
        return (
            <span>
                <Nav />
                <Notifications />

                {/* Main container for Profile Editing Page View */}
                <div className="main-container" style={{minHeight: 580}}>
                    <section className="news news-1">
                        <div className="container">
                            <h1>Edit Profile </h1>
                            <hr />
                            <div className="row">
                                <form name="editProfileForm" onSubmit={this.onSubmit} encType="multipart/form-data">
                                    <div className="col-md-6">
                                        {/* Name Form Input */}
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input className="form-control" name="name" type="text"
                                                   ref="fullname" value={this.state.currentUser.fullname}
                                                   onChange={this.onChange('currentUser.fullname')} id="name" />
                                            {this.renderHelpText(this.props.getValidationMessages('fullname'))}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="hire">Available for hire</label>
                                            <select className="form-control" id="hire" ref="hire"
                                                    value={this.state.currentUser.hire_status} name="hire"
                                                    onChange={this.onChange('currentUser.hire_status')}>
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {/* Profile_image Form Input */}
                                        <div className="form-group">
                                            <label htmlFor="profile_image">Profile Image</label>
                                            <input type="file" accept="image/!*" onChange={this.handleFile} />
                                            {/*<div>
                                                <Dropzone onDrop={this.onDrop} accept="image/!*" >
                                                    <div>Try dropping some files here, or click to select files to upload.</div>
                                                </Dropzone>
                                                {this.state.files.length > 0 ? <div>
                                                    <h2>Uploading {this.state.files.length} files...</h2>
                                                    <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
                                                </div> : null}
                                            </div>*/}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="address">Address</label> <small>(For the map)</small>
                                            <input className="form-control" name="address" type="text" ref="address"
                                                   value={this.state.currentUser.address} id="address"
                                                   onChange={this.onChange('currentUser.address')} />
                                            {this.renderHelpText(this.props.getValidationMessages('address'))}

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="twitter">Twitter</label>
                                            <small>(Starting with http:// or https://)</small>
                                            <input className="form-control" name="twitter" type="text" ref="twitter_handle"
                                                   value={this.state.currentUser.twitter_handle} id="twitter"
                                                   onChange={this.onChange('currentUser.twitter_handle')}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="website">Website</label>
                                            <small>(Starting with http:// or https://)</small>
                                            <input className="form-control" name="website" type="text" ref="website"
                                                   value={this.state.currentUser.website} id="website"
                                                   onChange={this.onChange('currentUser.website')}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="github_url">Github Url</label>
                                            <small>(Starting with http:// or https://)</small>
                                            <input className="form-control" name="github_profile" type="text" ref="github_profile"
                                                   value={this.state.currentUser.github_profile}  id="github_profile"
                                                   onChange={this.onChange('currentUser.github_profile')} />
                                            {this.renderHelpText(this.props.getValidationMessages('github_profile'))}

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="bio">Bio </label> <em>*Markdown Supported</em>
                                            <textarea className="form-control" name="bio" cols="50" rows="10"  ref="bio"
                                                      value={this.state.currentUser.bio} id="bio"
                                                      onChange={this.onChange('currentUser.bio')} />
                                            {this.renderHelpText(this.props.getValidationMessages('bio'))}
                                        </div>
                                    </div>
                                    {/* Save Changes Form Input */}
                                    <div className="form-group">
                                        <button className="form-control btn btn-block" type="submit">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
                {/* End Main Container for Profile Editing Page View */}

                 <Footer />
            </span>
        )
    }

    renderHelpText(message) {
        return (
            <span className='help-block has-error'>{message}</span>
        );
    }

    getClasses(field) {
        return classnames({
            'form-group': true,
            'has-error': !this.props.isValid(field)
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const onValidate = (error) => {
            if (error) {
                //alert('form has errors; do not submit');
            } else {
                var data = {
                    fullname: this.refs.fullname.value,
                    website: this.refs.website.value || '',
                    github_profile: this.refs.github_profile.value,
                    address: this.refs.address.value,
                    hire: this.refs.hire.value,
                    bio: this.refs.bio.value,
                    twitter: this.refs.twitter_handle.value
                };

                /*Request.post('/api/file/upload')
                    .set("Content-Type", "multipart/form-data; boundary=AaB03x")
                    .send(this.state.data_uri)
                    .end((err, res) => {
                        console.log(err);
                        console.log(res);
                    });*/
                //console.log(data);
                Request.put('/api/me')
                    .set('Authorization', 'Bearer ' + this.state.token)
                    .send(data)
                    .end(function(err, res) {
                        console.log(res.body);
                        if (err || !res.ok) {
                            notify.show(res.body.message, 'error');
                        } else {
                            notify.show(res.body.message);
                        }
                    });
            }
        };
        this.props.validate(onValidate);
    }
}

export default validation(strategy)(EditAccount);