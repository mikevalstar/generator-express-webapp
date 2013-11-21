'use strict';
module.exports = function (app) {
    
    // Add the route to the admin listing for editing the content
    app.get('adminRoutes').push({route: '/admin/<%= routename %>/list', routeName: '<%= modelname %>'});
    
    // Listing of items
    app.get('/admin/<%= routename %>/list/:page?', function (req, res) {
        
        if (!req.isAuthenticated()) {
            res.redirect("/admin/login");
            return;
        }
        
        app.get('models').<%= modelname %>.findAndCountAll().success(function (result) {
            res.render('admin/list.<%= routename %>.jade', {
                title: '<%= modelname %>',
                adminNav: app.get('adminRoutes'),
                results: result,
                model: app.get('models').<%= modelname %>
            });
        });
        
    });
    
    // Individual item view
    app.get('/admin/<%= routename %>/:id', function (req, res) {
        
        if (!req.isAuthenticated()) {
            res.redirect("/admin/login");
            return;
        }
        
        app.get('models').<%= modelname %>.find(req.params.id).success(function (<%= modelname %>) {
            res.render('admin/<%= routename %>', {
                title: '<%= modelname %>',
                item: <%= modelname %>,
                adminNav: app.get('adminRoutes')
            });
        });
        
    });
        
    app.post('/admin/<%= routename %>/:id', function (req, res) {
        
        if (!req.isAuthenticated()) {
            res.redirect("/admin/login");
            return;
        }
        
        if(req.params.id == 'new'){
            
            app.get('models').<%= modelname %>.create(req.body).success(function(item){
                res.redirect('/admin/<%= routename %>/' + item.id);
                return;
            });
            
        }else{
        
            app.get('models').<%= modelname %>.find(req.params.id).success(function (item) {
                item.updateAttributes(req.body).success(function(){
                    res.redirect('/admin/<%= routename %>/' + item.id);
                    return;
                });
            });
            
        }
        
    });
};