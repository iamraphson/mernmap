/**
 * Created by Raphson on 6/27/16.
 */
var mongoose = require('mongoose');
var secrets = require('./secrets');

var db = mongoose.connection;
mongoose.Promise = global.Promise;
mongoose.connect(secrets.db);

module.exports = {
    dbconnect : function(){
        db.on('error', console.error.bind(console, 'MongoDB Connection Error. Mongodb seems to be down'));
        db.on('open', function callback(){
            console.log('Connection came through');
        });
    }
}