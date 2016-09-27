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
    loginResult: null,
    AuthUserResult: null,
    updateResult: null,

    setUpdateResult(updateResult) {
        this.updateResult = updateResult;
        this.emitChange('update');
    },

    getUpdateResult()  {
        return this.updateResult
    },

    setAuthUserResult(AuthUserResult) {
        this.AuthUserResult = AuthUserResult;
        this.emitChange();
    },

    getAuthUserResult()  {
        return this.AuthUserResult
    },

    setLoginResult(loginResult) {
        this.loginResult = loginResult;
        this.emitChange('login');
    },

    getLoginResult()  {
        return this.loginResult
    },

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
        case AppConstants.USER_LOGIN :
            UserStore.setLoginResult(action.data);
            break;
        case AppConstants.AUTH_USER :
            UserStore.setAuthUserResult(action.data);
            break;
        case AppConstants.USER_UPDATE :
            UserStore.setUpdateResult(action.data);
            break;
        default:
        // no default action
    }
    return true;
});

module.exports = UserStore;