var express = require('express');
var router = express.Router();

const contents = require('../controller/content.controller');

// Create a new Content
router.post('/', contents.create);

// Retrieve all Contents
router.get('/', contents.findAll);

// Retrieve a single Content with contentId
router.get('/:contentId', contents.findOne);

// Update a Note with contentId
router.put('/:contentId', contents.update);

// Delete a Note with contentId
router.delete('/:contentId', contents.delete);

module.exports = router;