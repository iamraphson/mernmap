/**
 * Created by Raphson on 6/30/16.
 */
var user = require('../model/user.server.model');
var token = require('../../config/token');
var gravatar = require('gravatar');
var _  = require('lodash');
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

        var secureImageUrl = gravatar.url(req.body.email, {s: '200', r: 'x', d: 'retro'}, true);
        var newUser = new user({
            username : req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            website: req.body.website,
            github_profile: req.body.github_profile,
            address: req.body.address,
            hire_status: req.body.hire,
            bio: req.body.bio,
            user_avi: secureImageUrl,
            twitter_handle: req.body.twitter
        });

        newUser.save(function(err, result){
            console.log(err)
            if(err){
                return res.status(500).json({message: err.message});
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
        user.findOne({email : req.body.email}, function(err, loginUser){
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
        user.findById(req.user, function(err, result){
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
        var userDetails = {
            username : req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            website: req.body.website,
            github_profile: req.body.github_profile,
            address: req.body.address,
            hire_status: req.body.hire,
            bio: req.body.bio,
            user_avi: secureImageUrl,
            twitter_handle: req.body.twitter
        };

        user.update({_id: req.user._id}, userDetails, function(err){
            if(err){
                return res.status(404).json({message : 'user\s detail not found'})
            }

            return status(200).json({message: 'Update Successful'});
        });
    }


}