
const models = require('../models');
const moment = require('moment');
const path = require('path');
const Resize = require('../utils/Resize');

exports.getAllEvents = async (req, res) => {
    const events = await models.Event.findAll({ order: [['createdAt', 'DESC']] });
    res.send(events);
    // res.render('events-index', { events: events });
}

exports.getCreateEventForm = (req, res) => {
    res.render('events-new', {});
}

exports.createEvent = async (req, res) => {
    await processImageUpload(req, res);
    let imgUrl = req.file ? req.file.originalname : '';
    const event = await models.Event.create({...req.body, imgUrl});
    res.redirect(`/events/${event.id}`);
}

exports.showEvent = async (req, res) => {
    const event = await models.Event.findByPk(req.params.id, { include: {all: true} });
    let createdAt = event.createdAt;
    createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
    event.createdAtFormatted = createdAt;
    res.render('events-show', { event: event });
}

exports.getEditEventForm = async (req, res) => {
    const event = await models.Event.findByPk(req.params.id);
    res.render('events-edit', { event: event });
}

exports.updateEvent = async (req, res) => {
    await processImageUpload(req, res);
    const event = await models.Event.findByPk(req.params.id);
    let imgUrl = req.file ? req.file.originalname : event.imgUrl;
    await event.update({...req.body, imgUrl});
    res.redirect(`/events/${req.params.id}`);
}

exports.deleteEvent = async (req, res) => {
    const event = await models.Event.findByPk(req.params.id);
    event.destroy();
    res.redirect(`/`);
}

async function processImageUpload(req, res) {
    const imagePath = path.join(path.resolve("./"), '/public/images');
    const fileUpload = new Resize(imagePath);

    if (!req.file) {
        // res.status(401).json({error: 'Please provide an image'});
        return;
    }

    await fileUpload.save(req.file.buffer, req.file.originalname);
}