/**
 * Created by filipe on 11/25/15.
 */

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var usersController = require('../controllers/usersController');

passport.use(new BasicStrategy(usersController.validateUserLogin));


module.exports = {
    basicAuth : passport.authenticate('basic', { session: false })
};