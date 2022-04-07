const express = require('express')
const router = express.Router()
const {getCourses, createCourse, updateCourse, getCourseById, deleteCourse} = require("../controller/CourseController");
const {auth} = require("./tokenVerification");


router.get('/all',auth,getCourses)
router.get('/:id',auth,getCourseById)

router.post('/create',auth,createCourse)

router.put('/update/:id',auth,updateCourse)

router.delete('/delete/:id',auth,deleteCourse)
module.exports = router
