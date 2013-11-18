'use strict';
module.exports = function (app) {
    app.get('/admin', function (req, res) {
        
        if(!req.isAuthenticated()){
            res.redirect("/login");
            return;
        }
        
        res.render('admin/index', {
            title: 'Index'
        });
        
    });
};