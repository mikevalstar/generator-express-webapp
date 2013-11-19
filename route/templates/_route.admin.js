'use strict';
module.exports = function (app) {
    
    // Add the route to the admin listing for editing the content
    app.get('adminRoutes').push({route: '/admin/<%= routename %>', routeName: '<%= modelname %>'});
    
    // Listing of items
    app.get('/admin/<%= routename %>', function (req, res) {
        
        if (!req.isAuthenticated()) {
            res.redirect("/admin/login");
            return;
        }
        
        res.render('admin/list.<%= routename %>.jade', {
            title: '<%= routename %>',
            adminNav: app.get('adminRoutes')
        });
        
    });
    
    // Individual item view
    app.get('/admin/<%= routename %>/:id', function (req, res) {
        
        if (!req.isAuthenticated()) {
            res.redirect("/admin/login");
            return;
        }
        
        app.get('models').<%= modelname %>.find(req.params.id).success(function(<%= modelname %>){
            res.render('admin/<%= routename %>', {
                title: '<%= routename %>',
                item: <%= modelname %>,
                adminNav: app.get('adminRoutes')
            });
        });
        
    });
};