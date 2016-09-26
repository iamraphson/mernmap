/**
 * Created by Raphson on 6/30/16.
 */
var User = require('../model/user.server.model');
var token = require('../../config/token');
var gravatar = require('gravatar');
var _  = require('lodash');
var cloudinary  = require('cloudinary');
var  multiparty  = require('multiparty');
module.exports = {

    /*
     *   Welcome Note!
     *   @param req
     *   @param res
     *  @return json
     */
    welcome: function(req, res){
        return res.status(200).json({message : 'Welcome to MERN MAP API'});
    },

    /*
    * Register User with username and other infomation provided
    * @param req
    * @param res
    *
    */
    registerUser: function(req, res){
        var user = new User();
        var secureImageUrl = gravatar.url(req.body.email, {s: '200', r: 'x', d: 'retro'}, true);
        user.username       = req.body.username;
        user.fullname       = req.body.fullname;
        user.email          = req.body.email;
        user.password       = req.body.password;
        user.website        = req.body.website;
        user.github_profile = req.body.github_profile;
        user.address        = req.body.address;
        user.user_avatar    = secureImageUrl;

        user.save(function(err, result){
            if(err){
                if(err.name == 'MongoError' && err.message.indexOf('$email_1') > 0 ) {
                    return res.status(200).json({ success: false,
                        Error: 'Email is already registered. Please choose another' });
                } else if ( err.name == 'MongoError' && err.message.indexOf('$username_1') > 0) {
                    return res.status(200).json({ success: false,
                        Error: 'Username is already taken. Please choose another' });
                }
            } else {
                return res.status(200).json({ success: true,
                    message: "User Registered successfully. Please, login and be MERN" });
            }
        });
    },

    /*
     * Authenticate a user using Email and password
     * @param req
     * @param res
     * @return json
     */
    auth: function(req, res){
        User.findOne({email : req.body.email}, function(err, loginUser){
            if(!loginUser)
                return res.status(401).json({message : "Invalid Email"});


            loginUser.comparePassword(req.body.password, function(err, isMatch){
                if(!isMatch){
                    return res.status(401).json({message : "Invalid Password"});
                }

                var currUser   = _.pick(loginUser, '_id', 'fullname', 'user_avi', 'username');
                return res.status(200).send({token : token.createJWT(loginUser), user: currUser});
            });
        });
    },

    /*
    * get current logged-in user
    * @param req
    * @param res
    * @return json
     */
    getCurrentLoggedUser: function(req, res){
        User.findById(req.user, function(err, result){
            return res.status(200).send(result);
        });
    },

    /*
    * update current logged user's detail
    * @param req
    * @param res
    * @return json
     */

    updateLoggedInUserDetail: function(req, res){

        //var form = new multiparty.Form();

        var userDetails = {
            fullname: req.body.fullname,
            website: req.body.website,
            github_profile: req.body.github_profile,
            address: req.body.address,
            hire_status: req.body.hire,
            bio: req.body.bio,
            twitter_handle: req.body.twitter
        };

        console.log(userDetails);
        //return res.status(200).json({message: 'Update Successful'});
        //console.log(req.user);
        User.findByIdAndUpdate({_id: req.user}, userDetails, function(err){
            if(err){
                return res.status(404).json({message : 'user\s detail not found'})
            }
            return res.status(200).json({message: 'Update Successful'});
        });
    },

    /**
     * Upload a photo to MERNMAP's Cloudinary Server
     * @param  {void} req
     * @param  {void} res
     * @return {object}
     */
    postPhoto: function(req, res){
        var fileName = '';
        var size = '';
        var tempPath;
        var extension;
        var imageName;
        var destPath = '';
        var inputStream;
        var outputStream;
        var form = new multiparty.Form();

        form.on('error', function(err){
            console.log('Error parsing form: ' + err.stack);
        });
        form.on('part', function(part){
            if(!part.filename){
                return;
            }
            size = part.byteCount;
            fileName = part.filename;

        });
        form.on('file', function(name, file){
            tempPath     = file.path;
            console.log(tempPath);
            /*cloudinary.uploader.upload(tempPath, function(result){
                var pixUrl = result.url;
                res.json({ dest: pixUrl });
            });*/
        });
        form.on('close', function(){
            console.log('Uploaded!!');
        });
        form.parse(req);
    }

};

