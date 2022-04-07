const Student = require("../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Course = require("../models/course");

createUser = async (req, res) => {

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a student',
        })
    }

    const checkEmailExist = await Student.findOne({email: req.body.email})
    if (checkEmailExist) return res.status(400).send({error: "Email already exists"})

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const student = new Student(body)
    console.log(student)
    if (!student) {
        return res.status(400).json({success: false, error: err})
    }

    student.password = hashPassword
    try {
        const saveStudent = await student.save()
        return res.status(200).json({
            success: true,
            id: student._id,
            message: 'Student created!',
        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }


};


login = async (req, res) => {

    const user = await Student.findOne({email: req.body.email})
    if (!user) return res.status(400).send({error: "Invalid email"})


    const comparePassword = await bcrypt.compare(req.body.password, user.password)
    if (!comparePassword) return res.status(400).send({error: "Invalid password"})


    try {
        const token = jwt.sign({_id: user._id}, "token")

        res.header('auth-token', token)
        res.send({success: token})
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }


};

dummy = async (req, res) => {

    res.send({success: "hello world"})


};

function errorMessage(res) {
    return res
        .status(404)
        .json({success: false, error: `Student not found`})
}

students = async (req, res) => {

    await Student.find({}, (err, data) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!data.length) {
            return errorMessage(res);
        }
        return res.status(200).json({success: true, data: data})
    }).populate('course').catch(err => console.log(err))
}


deleteStudent = async (req, res) => {
    await Student.findOneAndDelete({_id: req.params.id}, (err, movie) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!movie) {
            return errorMessage(res);
        }

        return res.status(200).json({success: true, data: movie})
    }).catch(err => console.log(err))
}
updateStudent = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Student.findOne({_id: req.params.id}, (err, data) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Course not found!',
            })
        }
        data.firstName = body.firstName
        data.lastName = body.lastName
        data.address = body.address
        data.city = body.city
        data.phone = body.phone
        data.program = body.program
        data
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: data._id,
                    message: 'Student updated!',
                })
            })
            .catch(error => {
                return errorMessage(res)
            })
    })
}

studentById = async (req, res) => {
    console.log(req.params.id)
    await Student.findOne({_id: req.params.id}, (err, data) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        return res.status(200).json({success: true, data: data})
    }).populate('course').catch(err => console.log(err))
}


addCourse = async (req, res) => {
    let course = await Course.findOne({code: req.body.code}).lean().exec()
    if (!course) {
        return res.status(400).json({success: false, data: "course not found."})
    }
    console.log(course)
    const type = req.body.type
    if (type == "remove") {
        Student.findByIdAndUpdate(req.params.id, {$pull: {course: course._id}}, {
            upsert: true
        },).then(success => {

            return res.status(200).json({success: true})
        }).catch(error => {
            console.log(error)
            return res.status(400).json({success: false})
        })
    } else {
        Student.findByIdAndUpdate(req.params.id, {$push: {course: course}}, {
            upsert: true
        },).then(success => {

            return res.status(200).json({success: true})
        }).catch(error => {
            console.log(error)
            return res.status(400).json({success: false})
        })
    }


}

notAddedCourse = async (req, res) => {
    let course = await Course.find({}).lean().exec()
    if (!course) {
        return res.status(400).json({success: false, data: "course not found."})
    }
    await Student.findOne({_id: req.params.id}, (err, data) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!data.course) {

            return res.status(200).json({success: true, data: course})
        }

        let notIncludedCourse=[]
        let includeIds=[]
        data.course?.map((item)=>{
            includeIds.push(item.code)
        })
        console.log(includeIds)
        course.forEach((item,index)=>{
            if(!includeIds.includes(item.code)){
                notIncludedCourse.push(item)
            }


        })

        return res.status(200).json({success: true, data: notIncludedCourse})
    }).populate('course').catch(err => console.log(err))

}

studentByCourseCode= async (req, res) => {
    let courseCode=req.params.code;
    let course= await Course.findOne({code:courseCode}).lean().exec()
    console.log(course)
    const students = await Student.find({course: { $all: [course._id] }});
    return res.status(200).json({success: true, data: students})
}

module.exports = {
    createUser,
    login,
    dummy,
    deleteStudent,
    updateStudent,
    students,
    studentById,
    addCourse,
    notAddedCourse,
    studentByCourseCode
}
