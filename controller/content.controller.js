const Content = require('../model/contents.model');

//Create new Content
exports.create = (req, res) => {
    console.log(req.body);
    console.log(req.query);
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }

    // Create a Content
    const content = new Content({
        title: req.body.title || "No Content title", 
        description: req.body.description,
    });

    // Save Content in the database
    content.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the content."
        });
    });
};

// Retrieve all contents from the database.
exports.findAll = (req, res) => {
    Content.find()
    .then(contents => {
        res.send(contents);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving contents."
        });
    });
};

// Find a single content with a contentId
exports.findOne = (req, res) => {
    Content.findById(req.params.contentId)
    .then(content => {
        if(!content) {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });            
        }
        res.send(content);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving content with id " + req.params.contentId
        });
    });
};

// Update a content
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }

    // Find and update content with the request body
    Content.findByIdAndUpdate(req.params.contentId, {
        title: req.body.title || "No content title", 
        description: req.body.description,
    }, {new: true})
    .then(content => {
        if(!content) {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });
        }
        res.send(content);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.contentId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Content.findByIdAndRemove(req.params.contentId)
    .then(content => {
        if(!content) {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });
        }
        res.send({message: "Content deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete content with id " + req.params.contentId
        });
    });
};