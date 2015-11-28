/**
 * Created by Filipe Nogueira on 13/11/2015.
 */
var dbInstance = require('../Mongo/mongoConnection.js');
var user = require('../controllers/usersController');
var mongoose = dbInstance.db;

var ftSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    ownerName: { type: String, required: 'Owner name is required'},
    cnpj: { type: String, required: 'CNPJ is required'},
    email: { type: String, required: 'Email is required'},
    businessName: { type: String, required: 'Business name is required'},
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
        FoodTruck.findOneAndUpdate({userId: req.body.username},req.body,{upsert:false},function(err, numberAffected, raw){
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
        FoodTruck.find({},{_id:0, userId:0,__v:0}, function (err, docs) {
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
