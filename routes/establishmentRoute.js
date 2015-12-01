var express = require('express');
var router = express.Router();
var userContoller = require('../controllers/usersController');
var establishmentController = require('../controllers/establishmentController');
var auth = require('../authentication/basicAuth');

router.get('/',auth.basicAuth, establishmentController.findAll);

router.post('/',auth.basicAuth,establishmentController.updateEstablishment);

module.exports = router;
