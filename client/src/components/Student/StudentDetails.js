import React, {useEffect, useRef, useState} from "react";

import api, {getNotIncludedCourse} from "../../api";
import "./student.css"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useParams} from "react-router-dom";
import {Button, Form, Stack} from "react-bootstrap";
import {Card} from "@material-ui/core";
import auth from "../../auth/auth";
import AddOrDropCourse from "./DropCourse";
import Menu from "../Common/common";

;


function StudentDetails(props) {

    const [student, setStudent] = useState("");

    const {id} = useParams();
    const [remainingCourse, setRemainingCourse] = useState([]);

    useEffect(() => {
        const loggedInUser = auth.getToken();
        if (loggedInUser === "") {
            window.location.href = `/login`;
        }
        const fetchData = async () => {
            await api
                .getStudentById(id)
                .then((result) => {

                    setStudent(result.data.data);

                    // console.log(result.data.data)
                })
                .catch((error) => {
                    console.log("error in fetchData:", error);
                });
        };

        const fetchCourse = async () => {
            await api
                .getNotIncludedCourse(id)
                .then((result) => {

                    setRemainingCourse(result.data.data)


                })
                .catch((error) => {
                    //  console.log("error in fetchData:", error);
                });
        };
        fetchData();
        fetchCourse();


    }, []);


    return (
        <Stack>
            <Menu/>
            <div className="row">
                <div className="col-md-4 d-flex justify-content-center text-center">
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><h1>Student Details</h1></TableCell>
                                </TableRow>

                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>Email</b></TableCell>
                                    <TableCell>{student.email}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell>{student.firstName} {student.lastName}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><b>Address</b></TableCell>
                                    <TableCell>{student.address} {student.city}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><b>Phone</b></TableCell>
                                    <TableCell>{student.phone}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><b>Program</b></TableCell>
                                    <TableCell>{student.program}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><b>Courses</b></TableCell>
                                    <TableCell>
                                        <ul>
                                            {
                                                student.course?.map((data) => (
                                                    <li key={data.code}>{data.code} {data.name}</li>
                                                ))}
                                        </ul>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <AddOrDropCourse data={remainingCourse} id={student._id} type={"add"} title={"Add"}/>
                <AddOrDropCourse data={student?.course} id={student._id} type={"remove"} title={"Drop"}/>
            </div>
        </Stack>
    );
}


export default StudentDetails;
