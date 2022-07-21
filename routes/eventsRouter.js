const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController')

router.get('/', (req, res) => {
    eventController.getAllEvents(req, res);
});
router.get('/events', (req, res) => {
    eventController.getAllEvents(req, res);
});

// NEW
router.get('/events/new', (req, res) => {
    eventController.getCreateEventForm(req, res);
});

// CREATE
router.post('/events', (req, res) => {
    eventController.createEvent(req, res);
});

// SHOW
router.get('/events/:id', (req, res) => {
    eventController.showEvent(req, res);
});

// EDIT
router.get('/events/:id/edit', (req, res) => {
    eventController.getEditEventForm(req, res);
});

// UPDATE
router.put('/events/:id', (req, res) => {
    eventController.updateEvent(req, res);
});

// DELETE
router.delete('/events/:id', (req, res) => {
    eventController.deleteEvent(req, res);
});

module.exports = router;