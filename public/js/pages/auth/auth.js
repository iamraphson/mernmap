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

  logout(cb) {
      delete localStorage.mern_token
      delete localStorage.mern_user
      if (cb) cb()
      this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.mern_token && localStorage.mern_user;
  },

  onChange() {}
};
