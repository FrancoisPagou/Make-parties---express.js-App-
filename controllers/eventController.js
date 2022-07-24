
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
    await processImageUpload(req, res);
    const event = await models.Event.create({...req.body, imgUrl: req.file.originalname});

    console.log("event ", req.body);

    await res.redirect(`/events/${event.id}`);
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
        console.log("Edit event ", event)

        res.render('events-edit', { event: event });
    }).catch((err) => {
        console.log(err.message);
    })
}

exports.updateEvent = async (req, res) => {
    console.log("event ", req.body)

    await processImageUpload(req, res);
    const event = await models.Event.findByPk(req.params.id);
    await event.update({...req.body, imgUrl: req.file.originalname});
    await res.redirect(`/events/${req.params.id}`);
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
    const imagePath = path.join(path.resolve("./"), '/public/images');
    const fileUpload = new Resize(imagePath);

    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
        return;
    }

    await fileUpload.save(req.file.buffer, req.file.originalname);
}