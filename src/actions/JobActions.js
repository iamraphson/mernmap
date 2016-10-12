/**
 * Created by Raphson on 10/9/16.
 */
let AppConstants = require('../constants/AppConstants'),
    BaseActions = require('./BaseActions');

module.exports = {
    postJob: (job, token) => {
        BaseActions.post('/api/jobs/create', job, AppConstants.POST_JOB, token);
    },

    fetchAllJobs: () => {
        BaseActions.get('/api/jobs', AppConstants.GET_JOBS);
    }
}