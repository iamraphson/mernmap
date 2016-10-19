/**
 * Created by Raphson on 10/14/16.
 */
/**
 * Created by Raphson on 10/10/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
import Auth from '../../utils/auth';
import DeveloperActions from '../../actions/DeveloperActions';
import DeveloperStore from '../../stores/DeveloperStore';
import DeveloperList from './DeveloperList';

export default class Developers extends Component {
    constructor() {
        super();
        this.state = {
            developers: null,
        }
    }

    componentDidMount() {
        DeveloperActions.fetchAllDevelopers();
        DeveloperStore.addChangeListener(this.handleDevelopersResult, 'fetchDevelopers');
    }

    componentWillUnmount(){
        DeveloperStore.removeChangeListener(this.handleDevelopersResult, 'fetchDevelopers');
    }

    handleDevelopersResult = () => {
        let result = DeveloperStore.getDevelopers();
        console.log(result);
        if(result.status == 200){
            this.setState({
                developers: result.data
            });
        }
    }

    render() {
        return (
            <span>
                <NavBar />
                    <div style={{minHeight: 580}} className="main-container">
                        <section className="features features-6">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <h4>MERN STACK DEVELOPERS ON THE PLANET</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.state.developers
                                        ? this.state.developers.map((developer, i) => {
                                        return (
                                            <DeveloperList developer={developer} key={i} />
                                        )
                                    })
                                        : <p>Loading...</p>
                                    }
                                </div>
                            </div>
                        </section>
                        <section className="social social-1 near-footer">
                            <div className="container">
                                <div className="row">
                                    <div className="leader col-sm-12 text-center">
                <span>
                  <i className="fa fa-quote-left" />
                  A group of wolves is called a Pack. <br className="visible-desktop" />A group of Developers is called a Merge Conflict
                  <i className="fa fa-quote-right" /></span>
                                        <h5 className="lead-author">- Unknown</h5>
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