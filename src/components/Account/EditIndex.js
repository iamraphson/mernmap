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
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'pelfl4js';
const CLOUDINARY_UPLOAD_URL = '	https://api.cloudinary.com/v1_1/dloyv1pjb/upload';

export default class EditIndex extends React.Component {
    constructor(){
        super();
        this.state = {
            token: Auth.getToken(),
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ''
        }
    }

    componentDidMount() {
        UserActions.fetchAuthUser(this.state.token);
        UserStore.addChangeListener(this.handleAuthUserFetch);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this.handleAuthUserFetch);
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        console.log("handleImg");
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            console.log("response -> " + response);
            if (err) {
                console.error(err);
            }
            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
                console.log("name -> " + this.state.uploadedFile );
                console.log("url -> " + this.state.uploadedFileCloudinaryUrl );
            }
        });
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
                                            {(this.state.uploadedFileCloudinaryUrl === '') ?
                                                <span>
                                                    <label htmlFor="profile_image">Profile Image</label>
                                                    <Dropzone
                                                        multiple={false}
                                                        accept="image/*"
                                                        onDrop={this.onImageDrop.bind(this)}>
                                                        <p style={{textAlign: 'center'}}>
                                                            Drop an image or click to select a file to upload.
                                                        </p>
                                                    </Dropzone>
                                                </span> : <span>
                                                    <img className="editProfile-preview"
                                                         src={this.state.uploadedFileCloudinaryUrl} />
                                                </span>
                                            }
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