var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var foodtrucks = require('./routes/foodtruck');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var port = process.env.PORT || 8080;

var router = express.Router();
router.use(bodyParser.json());

// diz para onde devem ser repassadas requisições com terminação em /foodtrucks no seu endereço http
// vamos utilizar mais repasses desses quando for inserido espaços por exemplo
router.use('/foodtrucks', foodtrucks);

// define que todas as requisições começam com /api  por exemplo /api/foodtrucks
app.use('/api', router);

app.listen(port, function () {
    console.log("running on port: " + port);
});