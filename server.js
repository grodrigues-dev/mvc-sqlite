require('marko/node-require').install(); 
require('marko/express'); 

const express = require('express'); 
const app = express(); 
const routes = require('./src/routes/routes')
const bodyparser = require('body-parser')
const methodOverride = require('method-override')

app.use('/estatico', express.static('src/public'));

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


routes(app);



app.listen(3000,  () => console.log('Servidor no ar'))