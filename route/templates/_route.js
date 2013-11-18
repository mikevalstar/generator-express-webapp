'use strict';
module.exports = function (app) {
    <% if(!modelname){ %>
    app.get('/<%= routename %>', function (req, res) {
        
        res.render('<%= routename %>', {
            title: '<%= routename %>'
        });
        
    });
    <% } else { %>
    app.get('/<%= routename %>', function (req, res) {
        
        res.render('<%= routename %>', {
            title: '<%= routename %>'
        });
        
    });
    
    app.get('/<%= routename %>/:id', function (req, res) {
        
        app.get('models').<%= modelname %>.find(req.params.id).success(function(<%= modelname %>){
            res.render('<%= routename %>', {
                title: '<%= routename %>',
                item: <%= modelname %>
            });
        });
        
    });
    <% } %>
};