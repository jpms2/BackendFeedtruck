var express = require('express');
var router = express.Router();
var controller = require('../controllers/foodtrucksController');
// aqui vamos definir todas as possibilidades de requests feitos no endereço /api/foodtrucks
// sendo esses gets posts updates ...

router.get('/', function (req, res) {
    controller.findAllFoodTrucks(res);
});

router.post('/', function (req, res) {
    controller.registerFoodTruck(req.body, res);
});

module.exports = router;
