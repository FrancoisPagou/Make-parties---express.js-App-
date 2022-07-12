const express = require("express");
const {engine} = require("express-handlebars");
const Handlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('./models');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Use "main" as our default layout.
app.engine('handlebars', engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');


// OUR MOCK ARRAY OF PROJECTS
var events = [
    { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: path.resolve("./assets/img/waterfall.jpg") },
    { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: path.resolve("./assets/img/waterfall.jpg") },
    { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: path.resolve("./assets/img/waterfall.jpg") }
];

// render home page
app.get('/', (req, res) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
        res.render('events-index', { events: events });
  })
});

app.get('/events', (req, res) => {
    res.render('event-index', {events});
});

// NEW
app.get('/events/new', (req, res) => {
    res.render('events-new', {});
});

// CREATE
app.post('/events', (req, res) => {
    models.Event.create(req.body).then(event => {
        res.redirect(`/events/${event.id}`);
    }).catch((err) => {
        console.log(err)
    });
});

// SHOW
app.get('/events/:id', (req, res) => {
    // Search for the event by its id that was passed in via req.params
    models.Event.findByPk(req.params.id).then((event) => {
        // If the id is for a valid event, show it
        res.render('events-show', { event: event })
    }).catch((err) => {
        // if they id was for an event not in our db, log an error
        console.log(err.message);
    });
});


//Choose your port 
const port = process.env.PORT || 3000;

//Tell the app which port to listen
app.listen(port, () => {
    console.log(`App listening -- on port ${port}`);
});