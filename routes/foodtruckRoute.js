var express = require('express');
var router = express.Router();
var ftController = require('../controllers/foodtrucksController');
var userContoller = require('../controllers/usersController');

// aqui vamos definir todas as possibilidades de requests feitos no endereço /api/foodtrucks
// sendo esses gets posts updates ...

var auth = require('../authentication/basicAuth');

router.get('/',auth.basicAuth, ftController.findAllFoodTrucks);

router.post('/', userContoller.registerUser , ftController.registerFoodTruck);

module.exports = router;
