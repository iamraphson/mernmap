/**
 * Created by Raphson on 6/30/16.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
    username : {type: String, required: true, unique: true},
    fullname: {type: String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    website: {type: String, default: ''},
    github_profile: {type: String, default: ''},
    address: {type: String, required: true, default: ''},
    hire_status: {type: String, default: 'NO'},
    bio: {type: String, default: ''},
    user_avi: {type: String, default: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'},
    twitter_handle: {type: String, default: ''},
    registered_on: {type: String, default: Date.now()}
})

userSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(user.password, salt, function(err, hash){
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(password, done){
    bcrypt.compare(password, this.password, function(err, isMatch){
        done(err, isMatch);
    })
};

module.exports = mongoose.model('user', userSchema, 'users');