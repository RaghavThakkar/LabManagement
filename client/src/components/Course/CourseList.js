import React, {useEffect, useState} from "react";
import auth from "../../config/auth"
import "./course.css"
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, IconButton} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {Stack} from "react-bootstrap";
import Menu from "../Common/common";
import {useQuery, gql, useMutation} from '@apollo/client'
import {CourseQuery, DeleteCourseById, StudentsQuery} from "../../graphql/queries";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function DeleteCourse(props) {

    const  [deleteCourseById, {error}]=useMutation(DeleteCourseById,{
        onCompleted: (data => {
            window.location.href = `/courses`;
        }),
        onError: (error => {
            alert(error.message)
        }),
    })


    const deleteCourse = (event) => {
        event.preventDefault();


        if (window.confirm(`Do you want to delete the course ${props.code} permanently?`)) {

            deleteCourseById({
                variables: {
                    id: props.id,
                }
            })

        }
    };
    return <Button onClick={deleteCourse}>Delete</Button>;
}

function UpdateCourse(props) {
    const updateCourse = (event) => {
        event.preventDefault();
        window.location.href = `/course/update/${props.id}`;
    };
    return <Button onClick={updateCourse}>Update</Button>;
}

function CourseStudentList(props) {
    const list = (event) => {
        event.preventDefault();
        window.location.href = `/course/students/${props.code}`;
    };
    return <Button onClick={list}>{props.name}</Button>;
}

function CourseList(props) {
    const  {error, loading,data}=useQuery(CourseQuery)
    const [courses, setCourse] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

        const loggedInUser = auth.getToken();
        if (loggedInUser === "") {
            window.location.href = `/login`;
        }

        if(data) {
            console.log(data)
            setCourse(data.courses);
            setLoading(false);
        }
    }, data);

    let showTable = true;
    if (!data) {
        showTable = false;
        return ""
    }

    return (

        <div className="row">
            <Stack gap={3} className=" justify-content-center">
                <Menu/>
                <Button href="/course/add">
                    + Add Course</Button>
                <div className="d-flex justify-content-center text-center">


                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Code</b></TableCell>
                                    <TableCell align="right"><b>Name</b></TableCell>
                                    <TableCell align="right"><b>Section</b></TableCell>
                                    <TableCell align="right"><b>Semester</b></TableCell>
                                    <TableCell align="right"><b>Delete</b></TableCell>
                                    <TableCell align="right"><b>Update</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {courses.map((row) => (
                                    <TableRow key={row.code}>
                                        <TableCell component="th" scope="row"><CourseStudentList code={row.code}
                                                                                                 name={row.code}/>
                                        </TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.section}</TableCell>
                                        <TableCell align="right">{row.semester}</TableCell>
                                        <TableCell align="right"><DeleteCourse id={row._id}
                                                                               code={row.code}/></TableCell>
                                        <TableCell align="right"><UpdateCourse id={row._id}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Stack>
        </div>

    );
}


export default CourseList;
