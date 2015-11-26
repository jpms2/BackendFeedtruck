/**
 * Created by filipe on 11/25/15.
 */
var dbInstance = require('../Mongo/mongoConnection.js');
var mongoose = dbInstance.db;


var establishmentSchema = new mongoose.Schema({
    username: String,
    password: String
});


var Establishment = mongoose.model('Establishment', establishmentSchema);


module.exports = {
    registerEstablishment : function (req, res, next) {

        var establishment = new Establishment({
            username: req.body.username,
            password: req.body.password
        });
        establishment.save(function (err) {
            if (err){
                console.error(err);
                res.sendStatus(400);
            }

            console.log("Local cadastrado com sucesso");
            res.sendStatus(200);
            next();
        });

    }
};
