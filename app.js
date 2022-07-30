const express = require("express");
const session = require('express-session')
const methodOverride = require('method-override')
const {engine} = require("express-handlebars");
const Handlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const models = require("./models");
const bcrypt = require('bcrypt');

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

/* passed the session to all handlebars templates */
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

/* Use "main" as our default layout. */
app.engine('handlebars', engine(
    { defaultLayout: 'main', 
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);

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
app.post('/auth', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        try {
            const User = await models.User.findOne({where: {username: username}});
            const isValid = await bcrypt.compare(password, User.password);

            console.log("User ", User);

            if (isValid) {
                req.session.loggedIn = true;
                req.session.username = User.username;
                req.session.userId = User.id;

                res.redirect('/');
            }
        } catch (error) {
            console.log(error.message);
        }
    }
});

/* sign out */
app.post('/signout', async (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening -- on port ${port}`);
});