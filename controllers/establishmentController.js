/**
 * Created by filipe on 11/25/15.
 */
var dbInstance = require('../Mongo/mongoConnection.js');
var mongoose = dbInstance.db;


var establishmentSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    ownerName: { type: String, required: 'Owner name is required'},
    cnpj: { type: String, required: 'CNPJ is required'},
    email: { type: String, required: 'Email is required'},
    businessName: { type: String, required: 'Business name is required'},
    area: {
        x: Number,
        y: Number
    },
    cep: {type:String, required:true}
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
        Establishment.findOneAndUpdate({userId: req.body.username},req.body,{upsert:false},function(err, numberAffected, raw){
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
            user: req.body.user,
            ownerName: req.body.ownerName,
            cnpj: req.body.cnpj,
            email: req.body.email,
            businessName: req.body.businessName,
            area: req.body.area,
            cep: req.body.cep
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
