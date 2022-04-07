var mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    section: {
        type: String,
        required: true,
        minlength: 2
    },
    semester: {
        type: String,
        required: true,
        minlength: 2
    }
});

module.exports = mongoose.model('Course', courseSchema);