/**
 * Created by Raphson on 10/22/16.
 */
import React from 'react';
import NavBar from './NavBar/index';
import Footer from './Footer/Index';
import { Link } from 'react-router';

export default class About extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <span>
                <NavBar />
                {/* Main container for  About Page View */}
                <div style={{minHeight: 580}} className="main-container">
                    <section className="faq faq-1">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="faq">
                                        <h5>Definition Of MERNMAP</h5>
                                        <p>
                                            MERNMAP is an online directory for MERN Stack Developers all over the world. MERN Stack has become one of the foremost stack in app development worldwide. This site serves as a hub for MERN Stack Developers to work, share and get more connected than ever.
                                        </p>
                                    </div>
                                    <div className="faq">
                                        <h5>MERNMAP's Purpose</h5>
                                        <p>
                                            Mernmap was made because there wasn't any sophisticated website for housing mern Stack beginners, intermediate and advanced Developers. No dedicated platform for bringing mern stack developers from all over the World to Collaborate on Open Source Projects together.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="faq">
                                        <h5>Tools and services Employed in Building Mernmap</h5>
                                        <p>Basically it's built on the Mean Stack &amp; Angular-Bootstrap.</p>
                                        <li>Definitely Nodejs</li>
                                        <li>ReactJS</li>
                                        <li>Expressjs</li>
                                        <li>MongoDB</li>
                                        <li>Bootstrap</li>
                                        <li>openstreetmap</li>
                                        <li>Leaflet</li>
                                        <li>Momentjs</li>
                                        <li>Gravatar</li>
                                        <li>Heroku</li>
                                        <li>Github</li>
                                        <li>Sendgrid</li>
                                        <li>Superagent</li>
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
        );
    }
}