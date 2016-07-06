/**
 * Created by Raphson on 6/30/16.
 */
var userCtrl = require('./controller/user.server.controller');
var token = require('./../config/token');
module.exports = function(app){

    app.post('/api/login', userCtrl.auth);
    app.post('/api/register', userCtrl.registerUser);
    app.get('/api/me', token.ensureAuthenticated, userCtrl.getCurrentLoggedUser);
    app.put('/api/me', token.ensureAuthenticated, userCtrl.updateLoggedInUserDetail);
    app.post('/api/file/upload', userCtrl.postPhoto);
}