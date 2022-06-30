//Initialize express

import express from "express";
import {engine} from "express-handlebars";
import Handlebars from "handlebars";
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access';

const app = express();

// Use "main" as our default layout.
app.engine('handlebars', engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');


// render home page
app.get('/', (req, res) => {
    res.render('home', {msg: 'Handlebars'});
});

//Choose your port 
const port = process.env.PORT || 3000;

//Tell the app which port to listen
app.listen(port, () => {
    console.log(`App listening -- on port ${port}`);
});