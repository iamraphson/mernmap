/**
 * Created by Raphson on 9/24/16.
 */
import BaseStore from './BaseStore'
let AppConstants = require('../constants/AppConstants'),
    AppDispatcher = require('../dispatcher/AppDispatcher');

    if (!Object.assign) {
        Object.assign = require('object-assign');
    }
let UserStore = Object.assign({}, BaseStore, {
    signupResult: null,

    setSignupResult(signupResult) {
        this.signupResult = signupResult;
        this.emitChange('signup');
    },

    getSignupResult() {
        return this.signupResult;
    }
});

AppDispatcher.register((action) => {
    switch (action.actionType){
        case AppConstants.USER_SIGNUP :
            UserStore.setSignupResult(action.data);
            break;
        default:
        // no default action
    }
    return true;
});

module.exports = UserStore;