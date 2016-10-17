/**
 * Created by Raphson on 10/16/16.
 */
/**
 * Created by Raphson on 9/24/16.
 */
let AppConstants = require('../constants/AppConstants'),
    BaseActions = require('./BaseActions');

module.exports = {
    fetchAllDevelopers: () => {
        BaseActions.get('/api/users', AppConstants.GET_DEVELOPERS);
    },

    fetchADeveloper: (username) => {
        BaseActions.get('/api/user/' + username, AppConstants.GET_DEVELOPER);
    }
}
