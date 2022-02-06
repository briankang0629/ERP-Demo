var express = require('express');
var app = express();
const cors = require('cors');
const routeIndex = require('./routes/index');

require('dotenv').config();

app.use(express.json())
app.use('/api', routeIndex);

// CORS
app.use(cors({
    origin: ['https://www.google.com/']
}));

// 404
app.use(function (request, response, next) {
    next({});
});

//Handle 404
app.use(function(err, req, res, next){
    res.sendStatus(404);
    res.render('404');
    return;
});

//Handle 500
app.use(function(err, req, res, next){
    res.sendStatus(500);
    res.render('500');
});

app.listen(3000);

module.exports = { app };