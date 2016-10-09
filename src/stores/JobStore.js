/**
 * Created by Raphson on 10/9/16.
 */
import BaseStore from './BaseStore'
let AppConstants = require('../constants/AppConstants'),
    AppDispatcher = require('../dispatcher/AppDispatcher');

    if (!Object.assign) {
        Object.assign = require('object-assign');
    }
let JobStore = Object.assign({}, BaseStore, {
    updateResult: null,

    setUpdateResult(updateResult) {
        this.updateResult = updateResult;
        this.emitChange('update');
    },

    getUpdateResult()  {
        return this.updateResult
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

module.exports = JobStore;