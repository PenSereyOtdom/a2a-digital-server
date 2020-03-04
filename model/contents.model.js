const mongoose = require('mongoose');

const ContentSchema = mongoose.Schema({
    title: String,
    description: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Contents', ContentSchema);