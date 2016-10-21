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
    },

    fetchAuthUser: (token) => {
        BaseActions.get('/api/me', AppConstants.AUTH_USER, token);
    },

    update:(userPayload, token) =>{
        BaseActions.put('/api/me', userPayload, AppConstants.USER_UPDATE, token);
    },

    resetPasssword: (reset) => {
        BaseActions.post('/api/password', reset, AppConstants.RESET);
    }
}
