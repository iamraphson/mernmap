/**
 * Created by Raphson on 9/24/16.
 */
let AppDispatcher = require('../dispatcher/AppDispatcher');
let request = require('superagent');

module.exports = {
    get: (url: string, actionType: string, token: ? string = null) => {
        request
            .get(url)
            .set('Authorization', 'Bearer ' + token)
            .end((err, result) => {
                console.log("Get request result");
                console.log(result);
                AppDispatcher.dispatch({
                    actionType: actionType,
                    data: result.body
                });
            });
    },

    delete: (url: string, actionType: string, token: ?string = null) => {
        request
            .delete(url)
            .set('Authorization', 'Bearer ' + token)
            .end((err, result) => {
                console.log("delete request result");
                console.log(result);
                AppDispatcher.dispatch({
                    actionType: actionType,
                    data: result.body,
                    statusCode: result.statusCode
                });
            });
    },

    put: (url: string, data: Object, actionType: string, token: ?string = null) => {
        request
            .put(url)
            .set('Authorization', 'Bearer ' + token)
            .send(data)
            .end((err, result) => {
                console.log("Put request result");
                console.log(result);
                AppDispatcher.dispatch({
                    actionType: actionType,
                    data: result.body,
                    statusCode: result.statusCode
                });
            });
    },

    post: (url: string, data: Object, actionType: string, token: ?string = null) => {
        request
            .post(url)
            .set('Authorization', 'Bearer ' + token)
            .send(data)
            .end((err, result) => {
                console.log("Post request result");
                console.log(result);
                AppDispatcher.dispatch({
                    actionType: actionType,
                    data: result.body
                });
            });
    }
};