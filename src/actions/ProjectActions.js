/**
 * Created by Raphson on 10/5/16.
 */
let AppConstants = require('../constants/AppConstants'),
    BaseActions = require('./BaseActions');

module.exports = {
    shareProject: (project, token) => {
        BaseActions.post('/api/projects', project, AppConstants.PROJECT_SHARE, token);
    },

    fetchAllProjects: (token) => {
        BaseActions.get('/api/project', AppConstants.GET_PROJECT, token);
    }
}