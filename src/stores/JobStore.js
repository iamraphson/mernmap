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
    postJobResult: null,
    jobs: null,

    setPostJobResult(postJobResult) {
        this.postJobResult = postJobResult;
        this.emitChange('postjob');
    },

    getPostJobResult()  {
        return this.postJobResult
    },

    setJobs(jobs) {
        this.jobs = jobs;
        this.emitChange('fetchJobs');
    },

    getJobs()  {
        return this.jobs
    },
});

AppDispatcher.register((action) => {
    switch (action.actionType){
        case AppConstants.POST_JOB :
            JobStore.setPostJobResult(action.data);
            break;
        case AppConstants.GET_JOBS :
            JobStore.setJobs(action.data);
            break;
        default:
        // no default action
    }
    return true;
});

module.exports = JobStore;