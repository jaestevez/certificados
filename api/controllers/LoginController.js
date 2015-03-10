var passport = require('passport');

module.exports = {
    
    login: function(req, res) {
        res.view('login');
    },
    process: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if( (err)||(!user) ) {
                return res.send({
                    message: 'login failed'
                });
                res.send(err);
            }
            req.logIn(user, function(err) {
                if(err) res.send(err);
                /*return res.send({
                    message: 'login successful'
                });*/
                return res.redirect('/admin');
            });
        }) (req, res);
    },

    logout: function(req, res) {
        req.logOut();
        //res.send('logout successful');
        res.redirect('/');
    }
};

module.exports.blueprints = {
    actions: true,
    rest: true,
    shortcuts: true
};