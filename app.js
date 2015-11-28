var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./Mongo/config');
var foodtrucks = require('./routes/foodtruckRoute');
var establishment = require('./routes/establishmentRoute');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
var port = config.port;

var router = express.Router();
router.use(bodyParser.json());

// diz para onde devem ser repassadas requisições com terminação em /foodtrucks no seu endereço http
// vamos utilizar mais repasses desses quando for inserido espaços por exemplo
router.use('/foodtrucks', foodtrucks);
router.use('/establishments', establishment);

// define que todas as requisições começam com /api  por exemplo /api/foodtrucks
app.use('/api', router);

app.listen(port, function () {
    console.log("running on port: " + port);
});