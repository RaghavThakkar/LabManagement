import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userInfoSchema = mongoose.Schema({

    userEmail: {
        type: String,
        required: true,
        trim: true
    },
    pluseRate: {
        type: String,
        required: true,
        trim: true
    },
    weight: {
        type: String,
        required: true,
        trim: true
    },
    bloodPressure: {
        type: String,
        required: true,
        trim: true
    },
    temperature: {
        type: String,
        required: true,
        trim: true
    },
    respiratoryrate: {
        type: String,
        required: true,
        trim: true
    }
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

export default UserInfo