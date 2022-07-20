module.exports = function(app, models) {
    // render home page
    app.get('/', (req, res) => {
        models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
            res.render('events-index', { events: events });
        });
    });

    // OUR MOCK ARRAY OF PROJECTS
    var events = [
        { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: ""},
        { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: ""},
        { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: ""}
    ];

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
        models.Event.findByPk(req.params.id, { include: [{ model: models.Rsvp }] }).then(event => {
            console.log("RSVPS ", event.Rsvp)
            res.render('events-show', { event: event });
        }).catch((err) => {
            console.log(err.message);
        })
    });

    // EDIT
    app.get('/events/:id/edit', (req, res) => {
        models.Event.findByPk(req.params.id).then((event) => {
            res.render('events-edit', { event: event });
        }).catch((err) => {
            console.log(err.message);
        })
    });

    // UPDATE
    app.put('/events/:id', (req, res) => {
        models.Event.findByPk(req.params.id).then(event => {
            event.update(req.body).then(event => {
                res.redirect(`/events/${req.params.id}`);
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    });

    // DELETE
    app.delete('/events/:id', (req, res) => {
        models.Event.findByPk(req.params.id).then(event => {
            event.destroy();
            res.redirect(`/`);
        }).catch((err) => {
            console.log(err);
        });
    })
}