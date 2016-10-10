/**
 * Created by Raphson on 9/22/16.
 */

'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import Main from './components/landing/Main';
import Landing from './components/landing/Index';
import SignUp from './components/SignUp/Index';
import Login from './components/Login/Index';
import EditAccount from './components/Account/EditIndex';
import Account from './components/Account/index';
import Project from './components/Project/Index';
import ProjectDetails from './components/Project/ProjectDetails';
import Job from './components/Jobs/Index';
import CreateJob from './components/Jobs/CreateIndex';
import Auth from './utils/auth';
import {Router, Route, hashHistory, Redirect, IndexRoute, browserHistory} from 'react-router';

const requireAuth = (nextState, replace) => {
    if (!Auth.loggedIn()) {
        // Redirect to Home page if not an auth user
        replace({ pathname: '/' })
    }
}
render(
    <Router history={hashHistory}>
        <Route path="/" component={Main} >
            <IndexRoute component={Landing} />
            <Route path="user/create" component={SignUp} />
            <Route path="auth/login" component={Login} />
            <Route path="projects" component={Project} />
            <Route path="jobs" component={Job} />
            <Route path="post-a-job" component={CreateJob} />
            <Route path="account/edit" component={EditAccount} onEnter={requireAuth} />
            <Route path="account" component={Account} onEnter={requireAuth} />
            <Route path="/projects/featured/:slug" component={ProjectDetails} />
        </Route>
    </Router>,
    document.getElementById('app')
);
