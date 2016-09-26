/**
 * Created by Raphson on 9/26/16.
 */
/**
 * Created by Raphson on 9/24/16.
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import MyInput from '../forms/Input';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import Auth from '../../utils/auth';

export default class EditIndex extends React.Component {
    constructor(){
        super();
        this.state = {
            token: Auth.getToken(),
        }
    }

    componentDidMount() {
        UserActions.fetchAuthUser(this.state.token);
        UserStore.addChangeListener(this.handleAuthUserFetch);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this.handleAuthUserFetch);
    }

    handleAuthUserFetch = () => {
        let authUser = UserStore.getAuthUserResult();
        Auth.checkAuthRequired(authUser);

    }

    render(){
        return (
            <span>
                <NavBar />
                {/* Main container for Profile Editing Page View */}
                <div className="main-container" style={{minHeight: 580}}>
                    <section className="news news-1">
                        <div className="container">
                            <h1>Edit Profile </h1>
                            <hr />
                            <div className="row">
                                <form name="editProfileForm" onSubmit="" encType="multipart/form-data">
                                    <div className="col-md-6">
                                        {/* Name Form Input */}
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input className="form-control" name="name" type="text"
                                                   ref="fullname" value=""
                                                   onChange="" id="name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="hire">Available for hire</label>
                                            <select className="form-control" id="hire" ref="hire"
                                                    value="" name="hire"
                                                    onChange="">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {/* Profile_image Form Input */}
                                        <div className="form-group">
                                            <label htmlFor="profile_image">Profile Image</label>
                                            <input type="file" accept="image/!*" onChange="" />
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
                                                   value="" id="address"
                                                   onChange="" />

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="twitter">Twitter</label>
                                            <small>(Starting with http:// or https://)</small>
                                            <input className="form-control" name="twitter" type="text" ref="twitter_handle"
                                                   value="" id="twitter"
                                                   onChange=""/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="website">Website</label>
                                            <small>(Starting with http:// or https://)</small>
                                            <input className="form-control" name="website" type="text" ref="website"
                                                   value="" id="website"
                                                   onChange=""/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="github_url">Github Url</label>
                                            <small>(Starting with http:// or https://)</small>
                                            <input className="form-control" name="github_profile" type="text"
                                                   value=""  id="github_profile"
                                                   onChange="" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="bio">Bio </label> <em>*Markdown Supported</em>
                                            <textarea className="form-control" name="bio" cols="50" rows="10"  ref="bio"
                                                      value="" id="bio"
                                                      onChange="" />
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
        );
    }
}