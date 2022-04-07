const Course = require("../models/course");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const e = require("express");
const Console = require("console");


createCourse = async (req, res) => {

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a course',
        })
    }

    const course = new Course(body)

    console.log(course)
    if (!course) {
        return res.status(400).json({success: false, error: err})
    }

    course.save()
        .then(() => {
            console.log(course)
            return res.status(200).json({
                success: true,
                id: course._id,
                message: 'Course created!',
            })
        })
        .catch(error => {
            return errorMessage(res)
        })

}

updateCourse = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    const id = (req.params.id).trim();

    Course.updateOne({_id: id}, {
        code: body.code,
        name: body.name,
        section: body.section,
        semester: body.semester,
    },(err,result)=>{
        if(err){
            return res.status(404).json({
                err,
                message: 'Course not found!',
            })
        }else{
            return res.status(200).json({
                success: true,
                id: id,
                message: 'Course updated!',
            })
        }
    })


    // Course.findOne({_id: id}, (err, data) => {
    //     console.log(data)
    //     if (err) {
    //         return res.status(404).json({
    //             err,
    //             message: 'Course not found!',
    //         })
    //     }
    //     data.code = body.code
    //     data.name = body.name
    //     data.section = body.section
    //     data.semester = body.semester
    //     data
    //         .save()
    //         .then(() => {
    //             return res.status(200).json({
    //                 success: true,
    //                 id: id,
    //                 message: 'Course updated!',
    //             })
    //         })
    //         .catch(error => {
    //             return errorMessage(res)
    //         })
    // })
}

deleteCourse = async (req, res) => {
    await Course.findOneAndDelete({_id: req.params.id}, (err, movie) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!movie) {
            return errorMessage(res);
        }

        return res.status(200).json({success: true, data: movie})
    }).catch(err => console.log(err))
}

getCourseById = async (req, res) => {
    await Course.findOne({_id: req.params.id}, (err, data) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        return res.status(200).json({success: true, data: data})
    }).catch(err => console.log(err))
}

getCourses = async (req, res) => {
    console.log("#######")
    await Course.find({}, (err, data) => {
        console.log(data)
        if (err) {
            console.log(err)
            return res.status(400).json({success: false, error: err})
        }
        return res.status(200).json({success: true, data: data})
    }).catch(err => console.log(err))
}

function errorMessage(res) {
    return res
        .status(404)
        .json({success: false, error: `Course not found`})
}

module.exports = {
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    getCourses

}