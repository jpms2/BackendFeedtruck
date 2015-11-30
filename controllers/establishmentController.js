/**
 * Created by filipe on 11/25/15.
 */
var dbInstance = require('../Mongo/mongoConnection.js');
var mongoose = dbInstance.db;
var common = require('../common/common');

var establishmentSchema = new mongoose.Schema({
    ownerName: { type: String, required: 'Owner name is required'},
    cnpj: { type: String, required: 'CNPJ is required'},
    email: { type: String, required: 'Email is required'},
    businessName: { type: String, required: 'Business name is required'},
    prefersInstant: Boolean,
    prefersNegociate: Boolean,
    area: {
        x: Number,
        y: Number
    },
    address: common.address
});


var Establishment = mongoose.model('Establishment', establishmentSchema);


module.exports = {
    findAll:function(req,res,next){
        Establishment.find({},{_id:0, userId:0,__v:0},function(err,docs){
            if(err) throw err;
            if(docs.length > 0 ){
                res.status(200);
                res.json(docs);
                console.log("Todos os Locais foram retornados.")
            }else
                res.sendStatus(404);
        });
    },
    updateEstablishment: function(req,res,next) {
        Establishment.findOneAndUpdate({username: req.user.username},req.body,{upsert:false},function(err, numberAffected, raw){
            if(err)
                console.error(err);
            else{
                console.log(numberAffected,raw);
                res.sendStatus(200);
                next();
            }

        });
    },
    registerEstablishment : function (req, res, next) {

        var establishment = new Establishment({
            ownerName: req.body.ownerName,
            cnpj: req.body.cnpj,
            email: req.body.email,
            businessName: req.body.businessName,
            area: req.body.area,
            address: req.body.address,
            prefersInstant: req.body.prefersInstant,
            prefersNegociate: req.body.prefersNegociate
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

    },
    getSpecific: function (req,res,next) {
        Establishment.findOne({'email':req.user.email},{_id:0, userId:0,__v:0},function(err,user){
            if(err) console.error(err);
            var result = {logged: user, type: 'Establishment'};
            res.send(result);
        })
    }
};
