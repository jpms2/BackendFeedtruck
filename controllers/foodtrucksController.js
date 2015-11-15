/**
 * Created by Filipe Nogueira on 13/11/2015.
 */
var mongoose = require('mongoose');
var con = mongoose.connection;
con.onerror

var ftSchema = new mongoose.Schema({
    user: {
        username: String,
        password: String,
    },
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
    registerFoodTruck: function (req, res) {
        mongoose.connect('mongodb://proj:123456@ds053944.mongolab.com:53944/projetao');

        var ft = new FoodTruck({
            user: req.user,
            ownerName: req.ownerName,
            cnpj: req.cnpj,
            email: req.email,
            businessName: req.businessName,
            prefersEvent: req.prefersEvent,
            prefersPlace: req.prefersPlace,
            area: req.area
        });
        ft.save(function (err) {
            if (err) throw err;
            console.log("Foodtruck cadastrado com sucesso");
            res.sendStatus(200);
            mongoose.disconnect();
        });

    },
    findAllFoodTrucks: function (res) {
        mongoose.connect('mongodb://proj:123456@ds053944.mongolab.com:53944/projetao');
        FoodTruck.find({}, function (err, docs) {
            res.json(docs);
            mongoose.disconnect();
        });
    }
};
