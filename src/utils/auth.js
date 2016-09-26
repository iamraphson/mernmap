import { Router, Route, IndexRoute, hashHistory, Link } from 'react-router';
module.exports = {

    getToken() {
        return localStorage.getItem('mern_token');
    },

    getUser() {
        return localStorage.getItem('mern_user');
    },

    setToken(res){
        localStorage.setItem('mern_token', res.token);
        localStorage.setItem('mern_user', JSON.stringify(res.user));
    },

    logout() {
        localStorage.removeItem('mern_token');
        localStorage.removeItem('mern_user');
    },

    loggedIn() {
        return (localStorage.getItem('mern_token') !== null && localStorage.getItem('mern_user')!== null);
    },

    checkAuthRequired(res){
        if(res.status == 401){
            this.logout();
            hashHistory.push('auth/login');
        }
    }
};