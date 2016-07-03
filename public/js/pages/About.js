/**
 * Created by Raphson on 7/3/16.
 */
/**
 * Created by Raphson on 7/2/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import Footer from './Footer';
import Nav from './Nav';

export default class About extends React.Component{
    render(){
        return (
            <span>
                <Nav />
                {/* Main container for  About Page View */}
                <div className="main-container" style={{minHeight: 580}}>
                    <section className="faq faq-1">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="faq">
                                        <h5>Definition Of Meanmap.com</h5>
                                        <p>
                                            MERNMAP.com is an online directory for MERN Stack Developers all over the world. MERN Stack has become one of the foremost stack in app development worldwide. This site serves as a hub for MERN Stack Developers to work, share and get more connected than ever.
                                        </p>
                                    </div>
                                    <div className="faq">
                                        <h5>MERNMAP.com's Purpose</h5>
                                        <p>
                                            MERNMAP.com was made because there wasn't any sophisticated website for housing MERN Stack beginners, intermediate and advanced Developers. No dedicated platform for bringing MERN stack developers from all over the World to Collaborate on Open Source Projects together.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="faq">
                                        <h5>Tools and services Employed in Building Meanmap.com</h5>
                                        <p>Basically it's built on the Mean Stack &amp; Angular-Bootstrap.</p>
                                        <li>Definitely Nodejs</li>
                                        <li>ReactJS</li>
                                        <li>Expressjs</li>
                                        <li>MongoDB</li>
                                        <li>Bootstrap</li>
                                        <li>Google Maps</li>
                                        <li>Leaflet</li>
                                        <li>Momentjs</li>
                                        <li>Gravatar</li>
                                        <li>Heroku</li>
                                        <li>Github</li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="social social-1 near-footer">
                        <div className="container">
                            <div className="row">
                                <div className="leader col-sm-12 text-center">
                                    <span>"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live"</span>
                                    <h5 className="lead-author">- Martin Golding </h5>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/* End Main Container for About Page View */}
                <Footer />
            </span>
        )
    }
}