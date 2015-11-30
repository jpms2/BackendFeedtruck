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

router.get('/',ftController.findAllFoodTrucks);

module.exports = router;
