/**
 * Created by Raphson on 9/22/16.
 */
import React from 'react';
import NavBar from '../NavBar/index';
export default class Main extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <NavBar />
                { this.props.children }
            </div>
        );
    }
}