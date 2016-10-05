/**
 * Created by Raphson on 10/5/16.
 */
import BaseStore from './BaseStore'
let AppConstants = require('../constants/AppConstants'),
    AppDispatcher = require('../dispatcher/AppDispatcher');

    if (!Object.assign) {
        Object.assign = require('object-assign');
    }
let ProjectStore = Object.assign({}, BaseStore, {
    shareProjectResult: null,

    setShareProjectResult(shareProjectResult) {
        this.shareProjectResult = shareProjectResult;
        this.emitChange('shareProject');
    },

    getShareProjectResult()  {
        return this.shareProjectResult
    },

});

AppDispatcher.register((action) => {
    switch (action.actionType){
        case AppConstants.PROJECT_SHARE :
            ProjectStore.setShareProjectResult(action.data);
            break;
        default:
        // no default action
    }
    return true;
});

module.exports = ProjectStore;