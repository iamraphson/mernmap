module.exports = {
  /*login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },*/

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
