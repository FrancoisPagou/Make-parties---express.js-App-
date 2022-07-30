
const models = require('../models');

exports.getRsvpForm = (req, res) => {
    models.Event.findByPk(req.params.eventId).then(event => {
        res.render('rsvps-new', { event: event });
    });
}

exports.createRsvp = (req, res) => {
    req.body.EventId = req.params.eventId;
    models.Rsvp.create(req.body).then(rsvp => {
        res.redirect(`/events/${req.params.eventId}`);
    }).catch((err) => {
        console.log(err)
    });
}

exports.deleteRsvp = (req, res) => {
    models.Rsvp.findByPk(req.params.id).then(rsvp => {
        rsvp.destroy();
        res.redirect(`/events/${req.params.eventId}`);
    }).catch((err) => {
        console.log(err);
    });
}
