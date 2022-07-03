import express from "express";
import {engine} from "express-handlebars";
import Handlebars from "handlebars";
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access';
import path from 'path';

const app = express();

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
    res.render('event-index', {events});
});

app.get('/events', (req, res) => {
    res.render('event-index', {events});
});



//Choose your port 
const port = process.env.PORT || 3000;

//Tell the app which port to listen
app.listen(port, () => {
    console.log(`App listening -- on port ${port}`);
});