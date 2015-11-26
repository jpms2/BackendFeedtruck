/**
 * Created by Filipe Nogueira on 13/11/2015.
 */
var dbInstance = require('../Mongo/mongoConnection.js');
var mongoose = dbInstance.db;

var ftSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    ownerName: { type: String, required: true},
    cnpj: { type: String, required: true},
    email: { type: String, required: true},
    businessName: { type: String, required: true},
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
            userId: req.body.username,
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
            res.sendStatus(200);;
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
