/**
 * Created by Raphson on 7/2/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory } from 'react-router';


import MasterPage from './pages/MasterPage';
import IndexPage from './pages/IndexPage';
import About from './pages/About';
import Login from './pages/account/Login';
import CreateAccount from './pages/account/CreateAccount';
import EditAccount from './pages/account/EditAccount';

const app = document.getElementById('app');
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={MasterPage}>
            <IndexRoute component={IndexPage}></IndexRoute>
            <Route path="/auth/login" component={Login}></Route>
            <Route path="/page/about" component={About}></Route>
            <Route path="/user/create" component={CreateAccount}></Route>
            <Route path="/account/edit" component={EditAccount}></Route>
        </Route>
    </Router>, app);