/**
 * Created by Raphson on 9/22/16.
 */
import React from 'react';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
export default class Main extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <NavBar />
                { this.props.children }
                <Footer />
                <Alert stack={{limit: 3}} />
            </div>
        );
    }
}