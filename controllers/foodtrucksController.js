/**
 * Created by Filipe Nogueira on 13/11/2015.
 */
var dbInstance = require('../Mongo/mongoConnection.js');
var mongoose = dbInstance.db;

var ftSchema = new mongoose.Schema({
    userId: String,
    ownerName: String,
    cnpj: String,
    email: String,
    businessName: String,
    prefersEvent: Boolean,
    prefersPlace: Boolean,
    area: {
        x: Number,
        y: Number
    }
});

var FoodTruck = mongoose.model('FoodTruck', ftSchema);


module.exports = {
    registerFoodTruck: function (req, res, next) {

        var ft = new FoodTruck({
            user: req.body.user,
            ownerName: req.body.ownerName,
            cnpj: req.body.cnpj,
            email: req.body.email,
            businessName: req.body.businessName,
            prefersEvent: req.body.prefersEvent,
            prefersPlace: req.body.prefersPlace,
            area: req.body.area
        });
        ft.save(function (err) {
            if (err) throw err;

            console.log("Foodtruck cadastrado com sucesso");
            res.sendStatus(200);
            next();
        });

    },
    findAllFoodTrucks: function (req,res,next) {
        FoodTruck.find({}, function (err, docs) {
            if(err) throw err;
            if(docs.length > 0 ){
                res.status(200);
                res.json(docs);
                console.log("Todos os Foodtrucks foram retornados.")
            }else
                res.sendStatus(404);

        });
    }
};
