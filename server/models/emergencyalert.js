import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const emergencyAlertSchema = mongoose.Schema({

    userEmail: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }
});

const EmergencyAlert = mongoose.model('EmergencyAlert', emergencyAlertSchema);

export default EmergencyAlert