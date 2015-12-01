/**
 * Created by filipe on 11/29/15.
 */
/**
 * Created by filipe on 11/29/15.
 */
var express = require('express');
var router = express.Router();
var ftController = require('../controllers/foodtrucksController');
var userController = require('../controllers/usersController');
var estController  = require ('../controllers/establishmentController');

// aqui vamos definir todas as possibilidades de requests feitos no endereço /api/foodtrucks
// sendo esses gets posts updates ...

var auth = require('../authentication/basicAuth');

router.post('/', userController.registerUser , function(req,res,next){
    if(req.body.category === 'Foodtruck')
        ftController.registerFoodTruck(req,res,next);
    else if(req.body.category === 'Establishment')
        estController.registerEstablishment(req,res,next);
});

module.exports = router;
