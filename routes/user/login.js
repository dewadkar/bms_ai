var users = require('../../config/users');

module.exports = function (app) {

    this.loginPage = function (request, response) {
        response.render('login/login', {title: "Login"});
    };

    this.login = function (request, response) {
        var users_list = users.users;
        var data = request.body;
        var status = false;
        var response_data = {};
        console.log(data);
        for (var i = 0; i < users_list.length; i++) {
            if (data.user_name === users_list[i].user_name && data.password === users_list[i].password) {
                status = true;
                response_data = {
                    "status": "SUCCESS",
                    "user_name": users_list[i].user_name,
                    "full_name": users_list[i].name,
                    "message": "LOGIN SUCCESS"

                };
                break;
            }
        }
        if (status) {
            response.send(response_data);
        } else {
            response.send({
                "status": "FAIL",
                "message": "LOGIN FAILED"
            });
        }
    };
    app.get('/', this.loginPage);
    app.post('/login', this.login);
};
