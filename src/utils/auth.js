import { Router, Route, IndexRoute, hashHistory, Link } from 'react-router';
module.exports = {

    getToken() {
        return localStorage.mern_token
    },

    getUser() {
        return localStorage.mern_user
    },

    setToken(res){
        localStorage.mern_token = res.token;
        localStorage.mern_user = JSON.stringify(res.user);
    },

    logout() {
        delete localStorage.mern_token;
        delete localStorage.mern_user;
    },

    loggedIn() {
        return !!(localStorage.mern_token && localStorage.mern_user);
    },

    checkAuthRequired(res){
        if(res.statusCode == 401){
            console.log("CauthR - 1 " + res.statusCode);
            logout();
            Router.navigate('/auth/login');
        }

    },
};
