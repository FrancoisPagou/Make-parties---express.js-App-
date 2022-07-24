const express = require("express");
const methodOverride = require('method-override')
const {engine} = require("express-handlebars");
const Handlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');

const eventsRouter = require('./routes/eventsRouter');
const rsvpRouter = require('./routes/rsvpsRouter');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

/* Use "main" as our default layout. */
app.engine('handlebars', engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`));

/* routes */
app.use('/', eventsRouter);
app.use('/events', rsvpRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening -- on port ${port}`);
});