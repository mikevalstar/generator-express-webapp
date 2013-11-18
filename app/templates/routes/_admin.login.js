'use strict';
module.exports = function (app) {
    
    app.get('/admin/login', function (req, res) {
        
        res.render('admin/login', {
            title: 'Login'
        });
        
    });
    
    app.post('/admin/login',
        app.get('passport').authenticate('local', { successRedirect: '/admin',
                                                   failureRedirect: '/admin/login',
                                                   failureFlash: false })
    );
};