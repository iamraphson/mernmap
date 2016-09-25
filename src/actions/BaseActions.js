/**
 * Created by Raphson on 9/24/16.
 */
let AppDispatcher = require('../dispatcher/AppDispatcher');
let request = require('superagent');

module.exports = {
    get: (url , actionType, token = null) => {
        request
            .get(url)
            .set('Authorization', 'Bearer ' + token)
            .end((err, result) => {
                console.log("Get request result");
                console.log(result);
                AppDispatcher.dispatch({
                    actionType: actionType,
                    data: {data :result.body, status: result.statusCode}
                });
            });
    },

    delete : (url, actionType, token = null) => {
        request
            .delete(url)
            .set('Authorization', 'Bearer ' + token)
            .end((err, result) => {
                console.log("delete request result");
                console.log(result);
                AppDispatcher.dispatch({
                    actionType: actionType,
                    data: {data :result.body, status: result.statusCode},
                    statusCode: result.statusCode
                });
            });
    },

    put: (url , data , actionType , token = null) => {
        request
            .put(url)
            .set('Authorization', 'Bearer ' + token)
            .send(data)
            .end((err, result) => {
                console.log("Put request result");
                console.log(result);
                AppDispatcher.dispatch({
                    actionType: actionType,
                    data: {data :result.body, status: result.statusCode},
                    statusCode: result.statusCode
                });
            });
    },

    post: (url, data , actionType , token = null) => {
        request
            .post(url)
            .set('Authorization', 'Bearer ' + token)
            .send(data)
            .end((err, result) => {
                console.log("Post request result");
                console.log(result);
                AppDispatcher.dispatch({
                    actionType: actionType,
                    data: {data :result.body, status: result.statusCode}
                });
            });
    }
};