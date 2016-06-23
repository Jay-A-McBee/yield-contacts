var express = require('express');
var bodyParser = require('body-parser');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpack = require('webpack');
var config = require('../webpack.config');
var compiler = webpack(config);

var app = express();

//allows webpack rebuilds on server restarts
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use( bodyParser.urlencoded ({extended:true}) );
app.use(bodyParser.json());

app.use(express.static('../App'));

require('./routes')(app);

var port = process.env.PORT || 3000;

app.listen(port);

console.log("Listening on port -> " + port);
