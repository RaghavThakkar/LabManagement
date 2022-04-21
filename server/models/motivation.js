import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const motivationSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    videoURl: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    }
});

const Motivation = mongoose.model('Motivation', motivationSchema);

export default Motivation