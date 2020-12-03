//npm install express in terminal
var express = require ('express');
var app = express();

app.set('views', __dirname + '/demo/front_end');
app.engine('html', require('ejs').renderFile);

var api_routes = require('./api_routes_dev.js');
app.use('/api', api_routes)

app.use('/demo', express.static('demo/front_end'));

app.listen(3000, function() {
    console.log('Server is running on port 3000');
   
})
