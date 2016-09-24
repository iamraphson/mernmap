/**
 * Created by Raphson on 9/22/16.
 */
import React from 'react';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
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
            </div>
        );
    }
}