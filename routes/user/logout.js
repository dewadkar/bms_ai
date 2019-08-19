module.exports = function(app){

    this.logout = function(request,response){
        request.session.destory(function(err){
            if(!err){
                response.redirect('/');
            }
        });
    };


    app.get('/logout',this.logout);
};
