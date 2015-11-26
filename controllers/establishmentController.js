/**
 * Created by filipe on 11/25/15.
 */
var dbInstance = require('../Mongo/mongoConnection.js');
var mongoose = dbInstance.db;


var establishmentSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    ownerName: { type: String, required: true},
    cnpj: { type: String, required: true},
    email: { type: String, required: true},
    businessName: { type: String, required: true},
    area: {
        x: Number,
        y: Number
    }
});


var Establishment = mongoose.model('Establishment', establishmentSchema);


module.exports = {
    findAll:function(req,res,next){
        Establishment.find({},function(err,docs){
            if(err) throw err;
            if(docs.length > 0 ){
                res.status(200);
                res.json(docs);
                console.log("Todos os Locais foram retornados.")
            }else
                res.sendStatus(404);
        });
    },
    registerEstablishment : function (req, res, next) {

        var establishment = new Establishment({
            user: req.body.user,
            ownerName: req.body.ownerName,
            cnpj: req.body.cnpj,
            email: req.body.email,
            businessName: req.body.businessName,
            area: req.body.area
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
