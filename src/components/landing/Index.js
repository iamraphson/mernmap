/**
 * Created by Raphson on 9/23/16.
 */
import React from 'react';
export default class Index extends React.Component{
    constructor(){
        super()
    }

    render(){
        return(
            <span>
                <div className="main-container" style={{minHeight: 580}}>
                    <div className="MeanMap">
                        <div style={{border: '1px solid #ccc', boxShadow: '10px 10px #000'}}>
                            {/* Map goes here */}
                        </div>
                    </div>
                    <section className="features features-13">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-10 col-md-offset-1 col-sm-12 text-center">
                                    <h4 className="text-white">MERN Stack Developers Dominating the Earth<br /></h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 feature">
                                    <i className="fa fa-meanpath" />
                                    <h5 className="text-white">Built With The MERN Stack</h5>
                                    <p>Proudly Built With The MERN Stack. Javascript from Front-End To Back-end.The
                                        MERN Stack community is building up.</p>
                                </div>
                                <div className="col-sm-4 feature">
                                    <i className="fa fa-user-secret" />
                                    <h5 className="text-white">Developer Publicity</h5>
                                    <p>Meet Other MERN Stack Developers like You. Brew Top notch Code and
                                        Drink Beer Together. Get Connected and Hired. </p>
                                </div>
                                <div className="col-sm-4 feature">
                                    <i className="fa fa-laptop" />
                                    <h5 className="text-white">Hack, Sweat and Share</h5>
                                    <p>Be proud of the applications you've hacked with the MERN Stack,
                                        Showcase and share with the Community and World.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="cta cta-6">
                        <div className="container">
                            <div className="row v-align-children">
                                <div className="col-md-8 col-sm-7">
                                    <h3> MERN Developers are on the Planet..</h3>
                                    <p>...The Exhibition Of MERN Stack Developers. <strong>MERN CHAP 2:9 </strong></p>
                                </div>
                                <div className="col-md-4 col-sm-5 text-right">
                                    <a className="btn" href="page/about">More Info</a>
                                    <a className="btn btn-filled" href="user/create">Join Now</a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="social social-1 near-footer">
                        <div className="container">
                            <div className="row">
                                <div className="leader col-sm-12 text-center">
                    <span>
                      <i className="fa fa-quote-left" />
                      Any fool can write code that a computer can understand. <br className="visible-desktop" /> Good programmers write code that humans can understand.
                      <i className="fa fa-quote-right" />
                    </span>
                                    <h5 className="lead-author">- Martin Fowler</h5>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </span>
        );
    }
}