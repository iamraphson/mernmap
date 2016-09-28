/**
 * Created by Raphson on 9/28/16.
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';
import Auth from '../../utils/auth';
export default class EditIndex extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render(){
        return (
            <span>
                <NavBar />
                 <Footer />
            </span>
        );
    }
}