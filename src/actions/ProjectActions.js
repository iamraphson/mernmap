/**
 * Created by Raphson on 10/5/16.
 */
let AppConstants = require('../constants/AppConstants'),
    BaseActions = require('./BaseActions');

module.export = {
    shareProject: (project, token = null) => {
        BaseActions.post('/api/projects', project, AppConstants.PROJECT_SHARE, token);
    }
}