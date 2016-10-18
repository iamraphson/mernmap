/**
 * Created by Raphson on 10/17/16.
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
import DeveloperStore from '../../stores/DeveloperStore';
import ProjectStore from '../../stores/ProjectStore';
import DeveloperActions from '../../actions/DeveloperActions';
import ProjectActions from '../../actions/ProjectActions';
import Auth from '../../utils/auth';
import marked from 'marked';
import moment from 'moment';
import L from 'leaflet'
import Modal from 'boron/FlyModal';
import CreateIndex from '../Project/CreateIndex';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

var contentStyle = {
    height: '100%',
    width: '600px'
};
export default class Profile extends React.Component {
    constructor() {
        super();
        L.Icon.Default.imagePath = "//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/";
        this.state = {
            geocoder: new google.maps.Geocoder(),
            token: Auth.getToken(),
            authUser: Auth.getUser(),
            fullname: '',
            github_profile: '',
            website: '',
            hire_status: 'No',
            bio: '',
            user_avatar: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
            registered: '1454521239279',
            address: '',
            username: '',
            longitude: 3.540790900000047300,
            latitude: 6.523276500000000000,
            zoom: 11,
            showModal: false
        }
    }

    componentDidMount() {
        DeveloperActions.fetchADeveloper(this.props.params.username);
        DeveloperStore.addChangeListener(this.handleUserProfileFetch, 'fetchDeveloper');
        ProjectStore.addChangeListener(this.handleShareProjectResult, 'shareProject');
    }

    componentWillUnmount(){
        DeveloperStore.removeChangeListener(this.handleUserProfileFetch, 'fetchDeveloper');
        ProjectStore.removeChangeListener(this.handleShareProjectResult, 'shareProject');
    }

    handleUserProfileFetch = () => {
        let User = DeveloperStore.getDeveloper().data.user;
        this.setState({
            fullname: User.fullname,
            registered: User.registered,
            username: User.username,
            user_avatar: User.user_avatar,
            github_profile: User.github_profile,
            website: User.website,
            hire_status: User.hire_status,
            bio: User.bio,
            id: User.id,
            address: User.address
        });
        this.handleAddressResolve();
    }

    handleShareProjectResult = () => {
        let result = ProjectStore.getShareProjectResult();
        Auth.checkAuthRequired(result);
        if(result.status == 500){
            Alert.error(result.data.message, { position: 'top-right',  effect: 'bouncyflip'});
        } else {
            if(result.data.success){
                Alert.success(result.data.message, { position: 'top-right',  effect: 'bouncyflip'});
                this.refs.modal.hide();
            } else {
                Alert.error(result.data.message, { position: 'top-right',  effect: 'bouncyflip'});
            }
        }
    }

    handleAddressResolve = () => {
        this.state.geocoder.geocode({'address': this.state.address}, this.handleAddressResolveSuccess);
    }

    handleAddressResolveSuccess = (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
            let result = results[0].geometry.location;
            let map = L.map("map", {center: [this.state.latitude, this.state.longitude],zoom: this.state.zoom});
            L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {attribution: "OpenStreetMap"}).addTo(map);
            let marker = L.marker([result.lat(), result.lng()]).addTo(map);
            marker.bindPopup("<strong>" + this.state.username + "</strong>").openPopup();
        }
    }

    showModal = (e) => {
        e.preventDefault();
        this.refs.modal.show();
    }

    hideModal = (e) =>{
        e.preventDefault();
        this.refs.modal.hide();
    }

    handleProjectShare = (data) => {
        var projectPayLoad = {
            name: data.project_name,
            url: data.project_url,
            description: data.project_description
        };
        ProjectActions.shareProject(projectPayLoad, this.state.token);
    }


    render(){
        var owner;
        if (this.state.id && this.state.authUser) {
            owner = JSON.parse(this.state.authUser)._id == this.state.id;
        }
        return (
            <span>
                <NavBar />
                <div style={{minHeight: 580}} className="main-container">
                    <section className="header header-12">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 text-white">
                                    <h4 className="text-white">{this.state.fullname}</h4>
                                    <ul>
                                        <li><i className="fa fa-clock-o" /> Member since
                                            <span> { moment(this.state.registered, "x").format("DD MMM YYYY")} </span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="faq faq-1">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="faq">
                                        <img width={200} height={200} src={this.state.user_avatar }
                                             alt={this.state.fullname} className="img-rounded" />
                                    </div>
                                    <div className="faq">
                                        <h5>{this.state.fullname}</h5>
                                        <ul>
                                            {(this.state.github_profile != '') ?
                                                <li><a target="_blank" href={this.state.github_profile}>
                                                    <i className="fa fa-github" /> GitHub</a></li>
                                            : null }
                                            {(this.state.website != '') ?
                                                <li><a target="_blank" href={this.state.website}>
                                                    <i className="fa fa-globe" /> Website / Blog</a></li>
                                            : null }

                                        </ul>
                                        <br />
                                        <ul>
                                            {(this.state.hire_status == 'yes') ?
                                                <li ><i className="fa fa-suitcase" /> Not Available for Hire</li>
                                                :
                                                <li><i className="fa fa-suitcase" /> Available for Hire</li>
                                            }
                                            <br />
                                        </ul>
                                        {(owner) ?
                                            <ul>
                                                <li><i className="fa fa-project" />
                                                    <a onClick={this.showModal}
                                                       className="btn btn-default">Share Project</a>
                                                    <Modal ref="modal" contentStyle={contentStyle}>
                                                        <CreateIndex onClose={this.hideModal}
                                                                     onDataSubmit={this.handleProjectShare} />
                                                    </Modal>
                                                </li>
                                                <br />
                                            </ul> :
                                        null }
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="faq">
                                        <h5>Tell Us About Yourself</h5>
                                        <p dangerouslySetInnerHTML={{__html: marked(this.state.bio) }} />
                                    </div>
                                    <div className="faq">
                                        <h5>Location</h5>
                                        <div id="map" className="leaflet-container"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
            </span>
        );
    }
}