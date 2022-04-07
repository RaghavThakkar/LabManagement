var mongoose=require('mongoose');

const studentSchema=mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    address:{
        type: String,
        required: true,
        trim: true
    },
    city:{
        type: String,
        required: true,
        trim: true
    },
    phone:{
        type: String,
        required: true,
        trim: true
    },
    program:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type:String,
        required: true,
        minlength:6
    },
    course:[{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});

module.exports=mongoose.model('Student',studentSchema);