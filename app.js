var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var foodtrucks = require('./routes/foodtruck');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var port = process.env.PORT || 8080;

var router = express.Router();
router.use(bodyParser.json());

router.use('/foodtrucks', foodtrucks);

app.use('/api', router);

app.listen(port, function () {
    console.log("running on port: " + port);
});