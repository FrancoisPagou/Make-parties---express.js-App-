
const models = require('../models');
const moment = require('moment');

exports.getAllEvents = (req, res) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
        res.render('events-index', { events: events });
    });
}

exports.getCreateEventForm = (req, res) => {
    res.render('events-new', {});
}

exports.createEvent = (req, res) => {
    models.Event.create(req.body).then(event => {
        res.redirect(`/events/${event.id}`);
    }).catch((err) => {
        console.log(err)
    });
}

exports.showEvent = (req, res) => {
    models.Event.findByPk(req.params.id, { include: [{ model: models.Rsvp }] }).then(event => {
        let createdAt = event.createdAt;
        createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
        event.createdAtFormatted = createdAt;
        res.render('events-show', { event: event });
    }).catch((err) => {
        console.log(err.message);
    });
}

exports.getEditEventForm = (req, res) => {
    models.Event.findByPk(req.params.id).then((event) => {
        res.render('events-edit', { event: event });
    }).catch((err) => {
        console.log(err.message);
    })
}

exports.updateEvent = (req, res) => {
    models.Event.findByPk(req.params.id).then(event => {
        event.update(req.body).then(event => {
            res.redirect(`/events/${req.params.id}`);
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
}

exports.deleteEvent = (req, res) => {
    models.Event.findByPk(req.params.id).then(event => {
        event.destroy();
        res.redirect(`/`);
    }).catch((err) => {
        console.log(err);
    });
}