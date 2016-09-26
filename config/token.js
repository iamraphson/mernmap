/**
 * Created by Raphson on 6/28/16.
 */
var jwt = require('jwt-simple');
var moment = require('moment');
var secrets = require('./secrets');

function createJWT(user){
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(0.5, 'days').unix()
    };
    return jwt.encode(payload, secrets.TOKEN_SECRET);
}

function ensureAuthenticated(req, res, next){
    if(!req.header('Authorization')){
        return res.status(401).send({
            message : "Please make sure your reuqest has an Authorization header"
        });
    }

    var token = req.header('Authorization').split(' ')[1];
    var payload = null;

    try{
        payload = jwt.decode(token, secrets.TOKEN_SECRET);
    } catch(err){
        return res.status(401).send({
            message: err.message
        })
    }

    if(payload.exp <= moment().unix()){
        return res.status(401).json({
            message: "Token has expired"
        });
    }

    req.user = payload.sub;
    next();

}

module.exports = {
    createJWT : createJWT,
    ensureAuthenticated: ensureAuthenticated
};