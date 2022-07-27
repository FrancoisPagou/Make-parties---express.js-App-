const models = require('../models');

exports.addComment = async (req, res) => {
    req.body.EventId = req.params.id;
    await models.Comment.create(req.body);
    res.redirect(`/events/${req.params.id}`);
}