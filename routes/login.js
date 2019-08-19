module.exports = function (app) {

// Login routes
    require('./user/login')(app);
    // Logout
    require('./user/logout')(app);
};
