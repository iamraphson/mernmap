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
var path = require('path');

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

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
    let webpackDevMiddleware = require('webpack-dev-middleware');
    let webpackHotMiddleware = require('webpack-hot-middleware');
    let webpack = require('webpack');
    let config = require('./webpack.config');
    let compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
}
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

//app.use(express.static(path.join(__dirname)));


app.get('*', function(request, response) {
    response.sendFile(__dirname + '/public/index.html')
});


app.listen(port, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("=> MERN Listening on port %s. Visit http://localhost:%s/ in your browser.", port, port);
    }
});