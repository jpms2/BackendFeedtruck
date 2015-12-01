/**
 * Created by filipe on 11/25/15.
 */
var dbInstance = require('../Mongo/mongoConnection.js');
var mongoose = dbInstance.db;


var userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, },
    category: {type: String, required: true, enum: ['Foodtruck', 'Establishment']}
});

var User = mongoose.model('User', userSchema);

module.exports = {
    registerUser: function (req, res, next) {

        var user = new User({
            email: req.body.email,
            password: req.body.password,
            category : req.body.category
        });
        user.save(function (err) {
            if (err){
                console.error(err);
                res.sendStatus(400);
            }else{
                console.log("Usuario cadastrado com sucesso");
                next();
            }
        });

    },
    validateUserLogin : function(username, password, done){
            console.log({username: username.valueOf(),password: password.valueOf()});
            User.findOne({ 'email' : username.valueOf(), 'password': password.valueOf()}, function(err,user){
                if(user === undefined)
                    done(null, false);
                else
                    done(null,user);
            });

    },
    removeUser: function(email){
        User.findOneAndRemove({email: email}, function(err){
            if(err){
                console.error(err);
            }else{
                console.log("Usuario removido");
            }
        });
    },
    serialize : function(user,done){
        done(null,user.id);
    },
    deserialize: function(id,done){
        User.findById(id,function(err,user){
           done(err,user);
        });

    }
}
