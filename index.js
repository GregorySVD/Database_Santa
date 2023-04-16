const express = require("express");
const methodOverride = require("method-override");
const {engine} = require("express-handlebars");
const {handleError} = require("./utils/errors");

const app = express();

app.use(methodOverride('_method')); //to override method for REST API
app.use(express.urlencoded({
    extended: true,            //to parse data from forms
}));
app.use(express.static('public'));
//app.use(express.json()); //Content-type: application.json
app.engine('.hbs', engine({
    extname: '.hbs',
    // helpers: handbarsHelpers, //additional helpers to hbs
}))
app.set('view engine', '.hbs'); //setting view engine

app.get('/', (req, res) => {
    res.render('children/list.hbs')
});

app.use(handleError);

app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000');
}); //0.0.0.0 for replit
