/**
 * Created by Raphson on 10/16/16.
 */
/**
 * Created by Raphson on 9/24/16.
 */
let AppConstants = require('../constants/AppConstants'),
    BaseActions = require('./BaseActions');

module.exports = {
    fetchAllDeveloper: (token) => {
        BaseActions.get('/api/users', AppConstants.GET_DEVELOPERS);
    }
}
