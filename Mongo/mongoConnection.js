/**
 * Created by filipe on 11/25/15.
 */
var config = require('./config.js');

var mongoose = require('mongoose');

mongoose.connect(config.connectionString);

module.exports = {
    db : mongoose
}