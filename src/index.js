/**
 * Created by Raphson on 9/22/16.
 */

'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import Main from './components/landing/Main';
import Landing from './components/landing/Index';
import SignUp from './components/SignUp/Index';
import {Router, Route, hashHistory, Redirect, IndexRoute} from 'react-router';

render(
    <Router history={hashHistory}>
        <Route path="/" component={Main} >
            <IndexRoute component={Landing} />
            <Route path="user/create" component={SignUp} />
        </Route>
    </Router>,
    document.getElementById('app')
);
