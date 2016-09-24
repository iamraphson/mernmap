/**
 * Created by Raphson on 9/22/16.
 */

'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import Main from './components/landing/Main';
import Landing from './components/landing/Index';
import {Router, Route, browserHistory, Redirect, IndexRoute} from 'react-router';

render(
    <Router history={browserHistory}>
        <Route path="/" component={Main} >
            <IndexRoute component={Landing} />
        </Route>
    </Router>,
    document.getElementById('app')
);
