var express = require('express');
var router = express.Router();
var controller = require('../controllers/foodtrucksController');
/* GET users listing. */
router.get('/', function (req, res) {
    controller.findAllFoodTrucks(res);
});
router.post('/', function (req, res) {
    console.log("chegou");
    controller.registerFoodTruck(req.body, res);
});
module.exports = router;
