/**
 * Created by Raphson on 9/26/16.
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import MyInput from '../forms/Input';
import MySelect from '../forms/Select';
import MyTextarea from '../forms/Textarea';
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
            canSubmit: false,
            uploadedFile: null,
            uploadedFileCloudinaryUrl: '',
            fullName: '',
            hireStatus: 'No',
            twitter:'',
            website: '',
            github: '',
            bio: '',
            address: ''
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
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }
            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });
    }
    handleAuthUserFetch = () => {
        let authUser = UserStore.getAuthUserResult();
        Auth.checkAuthRequired(authUser);
        console.log(authUser);
        this.setState({
            fullName: authUser.data.fullname,
            hireStatus: authUser.data.hire_status,
            twitter: authUser.data.twitter_handle,
            website: authUser.data.website,
            github: authUser.data.github_profile,
            bio: authUser.data.bio,
            address: authUser.data.address,
        });
    }

    enableButton = () => {
        this.setState({ canSubmit: true });
    }

    disableButton = () => {
        this.setState({ canSubmit: false });
    }

    handleSubmit = (data) => {
        alert(JSON.stringify(data));
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
                                <Formsy.Form name="editProfileForm" onValidSubmit={this.handleSubmit}
                                     onValid={this.enableButton} onInvalid={this.disableButton} className="col-md-8">
                                    <div className="col-md-6">
                                        {/* Name Form Input */}
                                        <MyInput className="form-group" name="name" title="Name"
                                                 placeholder="Name" validations="minLength:1"
                                                 validationError="Name is required."
                                                 value={this.state.fullName} />
                                        <MySelect name="hire" title="Available for hire"
                                              className="form-group" value={this.state.hireStatus}
                                              options={[
                                                        { value: "YES", title: "YES" },
                                                        { value: "NO", title: "NO" }
                                                      ]}
                                        />
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
                                        <MyTextarea className="form-group" title="Address(For the map)"
                                            placeholder="Your Address" cols="50" rows="3" name="address"
                                            value={this.state.address} validationError="Address is required."
                                            required />
                                        <MyInput className="form-group" name="twitter" value={this.state.twitter}
                                             title="Twitter (Starting with http:// or https://)"
                                             placeholder="Twitter" />
                                        <MyInput className="form-group" name="website" value={this.state.website}
                                                 title="Website (Starting with http:// or https://)"
                                                 placeholder="Website" />
                                        <MyInput className="form-group" name="github_url" value={this.state.github}
                                                 title="Github Url (Starting with http:// or https://)"
                                                 placeholder="Github URL" validations="isUrl"
                                                 validationError="Github URL is required." />
                                        <MyTextarea className="form-group" title="Bio *Markdown Supported"
                                            placeholder="Your Bio" cols="50" rows="10" name="bio"
                                            value={this.state.bio} required  validationError="Bio is required." />
                                    </div>
                                    {/* Save Changes Form Input */}
                                    <div className="form-group">
                                        <button className="form-control btn btn-block" type="submit"
                                            disabled={!this.state.canSubmit} >Save Changes</button>
                                    </div>
                                </Formsy.Form>
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