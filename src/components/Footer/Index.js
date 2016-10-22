/**
 * Created by Raphson on 9/24/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class Footer extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                {/* Footer Begins */}
                <section id="sidebar" className="new_footer">
                    <div className="container">
                        <div className="row">
                            <div className="span3 offset1">
                                <h5>MORE INFO</h5>
                                <div><a href="https://twitter.com/iamraphson" target="_target">Twitter</a></div>
                                <div><Link to="/page/about">About</Link></div>
                                <div><Link to="page/contact">Contact</Link></div>
                            </div>
                            <div className="span3">
                                <h5>CO-PLANETS</h5>
                                <span className="white-text"><a href="https://scotch.io/" target="_blink">
                                    Scotch.io
                                </a></span><br />
                                 <span className="white-text"><a href="https://react.rocks/" target="_blink">
                                     React Rocks
                                 </a></span><br />
                                <span className="white-text"><a href="http://leafletjs.com/" target="_blink">
                                    LeafletJs
                                </a></span><br />
                            </div>
                            <div className="span4">

                            </div>
                        </div>
                    </div>
                </section>
                {/* Footer Ends */}
                <footer id="copyright">
                    Copyright © 2015 MERNMAP was created By <a href="https://twitter.com/iamraphson">Ayeni Olusegun</a>. MERN Developers Brewing Fire Together
                </footer>
            </div>
        )
    }
}