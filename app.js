const express = require("express");
const methodOverride = require('method-override')
const {engine} = require("express-handlebars");
const Handlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const models = require('./models');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Use "main" as our default layout.
app.engine('handlebars', engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');

require('./controllers/events')(app, models);
require('./controllers/rsvps')(app, models);



//Choose your port 
const port = process.env.PORT || 3000;

//Tell the app which port to listen
app.listen(port, () => {
    console.log(`App listening -- on port ${port}`);
});