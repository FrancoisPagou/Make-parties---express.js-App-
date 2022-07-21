
const models = require('../models');
const moment = require('moment');
const path = require('path');
const Resize = require('../utils/Resize');

exports.getAllEvents = (req, res) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
        res.render('events-index', { events: events });
    });
}

exports.getCreateEventForm = (req, res) => {
    res.render('events-new', {});
}

exports.createEvent = async (req, res) => {
    console.log("BODY CREATE ", req.body);
    await processImageUpload(req, res);
    const event = await models.Event.create(req.body);
    res.redirect(`/events/${event.id}`);
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

async function processImageUpload(req, res) {
    const imagePath = path.join(__dirname, '/public/images');
    const fileUpload = new Resize(imagePath);
  
    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);

    return res.status(200).json({ name: filename });
}