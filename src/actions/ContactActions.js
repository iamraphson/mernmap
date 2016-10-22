/**
 * Created by Raphson on 10/22/16.
 */
/**
 * Created by Raphson on 9/24/16.
 */
let AppConstants = require('../constants/AppConstants'),
    BaseActions = require('./BaseActions');

module.exports = {
    contact: (contactPayload) =>{
        BaseActions.post('/api/contact', contactPayload, AppConstants.CONTACT);
    }
};