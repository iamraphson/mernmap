/**
 * Created by Raphson on 6/30/16.
 */
require('dotenv').load();
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var dbconnection = require('./config/dbconn');
var routes = require('./server/routes');

/*
 Establish Connection with Mongo DB
 */
dbconnection.dbconnect();

/*
 Setting Application Listen Port
 */
var port = process.env.PORT || 3000;

//create Express Server
var app = express();

/*
 Express Configuration
 */
if(process.env.NODE_ENV === "production"){
    app.enable('trust proxy');
    app.use(function(req, res, next){
        if(req.secure){
            //Request was Via Secure HTTP protocol
            next();
        } else {
            res.direct('https://' + req.headers.host + req.url);
        }
    })
}

//Enable Cross Origin access control
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static( __dirname + "/public" ));

routes(app);

/*
 Config for frontend routes
 */
/*app.get('*', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});*/

/*
 Start application server
 */
app.listen(port, function(){
    console.log("MERN Server Listening on port " + port);
})
