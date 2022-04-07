const express = require('express')
const router = express.Router()
const {createUser, login, dummy, students, studentById, updateStudent, deleteStudent, addCourse, notAddedCourse,
    studentByCourseCode
} = require("../controller/StudentController");
const {auth} = require("./tokenVerification");



router.get('/',auth,students)
router.get('/:id',auth,studentById)
router.put('/update/:id',auth,updateStudent)
router.delete('/delete/:id',auth,deleteStudent)
router.put('/course/add/:id',auth,addCourse)
router.get('/nonAddedCourse/:id',auth,notAddedCourse)
router.get('/studentsByCourseCode/:code',auth,studentByCourseCode)

router.post('/login', login);
router.post('/signup',createUser );

module.exports = router