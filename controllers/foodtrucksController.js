/**
 * Created by Filipe Nogueira on 13/11/2015.
 */
var dbInstance = require('../Mongo/mongoConnection.js');
var user = require('../controllers/usersController');
var mongoose = dbInstance.db;
var common = require('../common/common');

var ftSchema = new mongoose.Schema({
    ownerName: { type: String, required: 'Owner name is required'},
    cnpj: { type: String, required: 'CNPJ is required'},
    email: { type: String, required: 'Email is required'},
    address: common.address,
    businessName: { type: String, required: 'Business name is required'},
    type: { type: String, required: 'type is required'},
    vehicle: { type: String, required: 'vehicle is required'},
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
            ownerName: req.body.ownerName,
            cnpj: req.body.cnpj,
            email: req.body.email,
            businessName: req.body.businessName,
            prefersEvent: req.body.prefersEvent,
            prefersPlace: req.body.prefersPlace,
            area: req.body.area,
            address: req.body.address,
            type: req.body.type,
            vehicle: req.body.vehicle
        });
        ft.save(function (err) {
            if (err){
                console.error(err);
                user.removeUser((req.body.username));
                res.json(err.message);
            }else{
                console.log("Foodtruck cadastrado com sucesso");
                res.sendStatus(200);
            }
        });

    },
    updateFoodTruck: function(req,res,next) {
        FoodTruck.findOneAndUpdate({email: req.user.email},req.body,{upsert:false},function(err, numberAffected, raw){
           if(err)
                console.error(err);
           else{
               console.log(numberAffected,raw);
               res.sendStatus(200);
               next();
           }
        });
    },
    findAllFoodTrucks: function (req,res,next) {
        console.log(req.user);
        FoodTruck.find({},{_id:0, userId:0,__v:0}, function (err, docs) {
            if(err) throw err;
            if(docs.length > 0 ){
                res.status(200);
                res.json(docs);
                console.log("Todos os Foodtrucks foram retornados.")
            }else
                res.sendStatus(404);

        });
    },
    getSpecific: function (req,res,next) {
        FoodTruck.findOne({'email':req.user.email},{_id:0, __v:0},function(err,user){
            if(err) console.error(err);
            var result = {logged: user, type: 'Foodtruck'};
            res.status(200).json(result);
        })
    }
};
