const express = require("express");
const session = require('express-session')
const methodOverride = require('method-override')
const {engine} = require("express-handlebars");
const Handlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');

const eventsRouter = require('./routes/eventsRouter');
const rsvpRouter = require('./routes/rsvpsRouter');
const commentRouter = require('./routes/commentRouter');
const accountRouter = require('./routes/accountRouter');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

/* Use "main" as our default layout. */
app.engine('handlebars', engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`));

/* routes */
app.use('/', eventsRouter);
app.use('/events', rsvpRouter);
app.use('/events', commentRouter);
app.use('/', accountRouter);

/* login form */
app.get('/login', (req, res) => {
    res.render('login', { options: [] });
});

/* authentication */
app.post('/auth', (req, res) => {
    res.send("Auth route OK")
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening -- on port ${port}`);
});