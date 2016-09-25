/**
 * Created by Raphson on 9/24/16.
 */
let AppConstants = require('../constants/AppConstants'),
    BaseActions = require('./BaseActions');

module.exports = {
    signup: (user) => {
        BaseActions.post('/api/register', user, AppConstants.USER_SIGNUP);
    },

    login: (user) => {
        BaseActions.post('/api/login', user, AppConstants.USER_LOGIN);
    }

}
