const express = require('express');
const router = express.Router();
const rsvpController = require('../controllers/rsvpController')

 // NEW
router.get('/:eventId/rsvps/new', (req, res) => {
    rsvpController.getRsvpForm(req, res);
});

// CREATE
router.post('/:eventId/rsvps', (req, res) => {
    rsvpController.createRsvp(req, res);
});

// DELETE
router.delete('/:eventId/rsvps/:id', (req, res) => {
    rsvpController.deleteRsvp(req, res);
}); 

module.exports = router;