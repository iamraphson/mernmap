/**
 * Created by Raphson on 6/30/16.
 */
var userCtrl = require('./controller/user.server.controller');
module.exports = function(app){

    app.post('/api/login', userCtrl.auth);
    app.post('/api/register', userCtrl.registerUser);
}