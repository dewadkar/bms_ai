module.exports = function (app) {

    this.logout = function (request, response) {
        request.session.destroy();
        response.redirect('/');
    };


    app.get('/logout', this.logout);
};
