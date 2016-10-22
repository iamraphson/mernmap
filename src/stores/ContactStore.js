/**
 * Created by Raphson on 10/22/16.
 */
import BaseStore from './BaseStore'
let AppConstants = require('../constants/AppConstants'),
    AppDispatcher = require('../dispatcher/AppDispatcher');

if (!Object.assign) {
    Object.assign = require('object-assign');
}
let ContactStore = Object.assign({}, BaseStore, {
    contactResult: null,

    setContactResult(contactResult) {
        this.contactResult = contactResult;
        this.emitChange('contact');
    },

    getContactResult()  {
        return this.contactResult
    }
});

AppDispatcher.register((action) => {
    switch (action.actionType){
        case AppConstants.CONTACT :
            ContactStore.setContactResult(action.data);
            break;
        default:
        // no default action
    }
    return true;
});

module.exports = ContactStore;