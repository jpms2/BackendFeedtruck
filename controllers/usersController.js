/**
 * Created by filipe on 11/25/15.
 */
var dbInstance = require('../Mongo/mongoConnection.js');
var mongoose = dbInstance.db;


var userSchema = new mongoose.Schema({
    username: String,
    password: String
});


var User = mongoose.model('User', userSchema);


module.exports = {
    registerUser: function (req, res, next) {

        var user = new User({
            username: req.body.username,
            password: req.body.password
        });
        user.save(function (err) {
            if (err){
                console.error(err);
                res.sendStatus(400);
            }

            console.log("Usuario cadastrado com sucesso");
            next();
        });

    },
    validateUserLogin : function(username, password, done){
        User.find({ 'username' : username.valueOf(), 'password': password.valueOf()}, function(err,user){
            if(user.length === 1)
                done(null, user);
            else
                done(null,false);
        });
    }
}
