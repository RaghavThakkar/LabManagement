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


function CourseStudent(props) {

    const [student, setStudent] = useState("");

    const {code} = useParams();


    useEffect(() => {
        const loggedInUser = auth.getToken();
        if (loggedInUser === "") {
            window.location.href = `/login`;
        }
        const fetchData = async () => {
            await api
                .studentsByCourseCode(code)
                .then((result) => {
                    setStudent(result.data.data);
                })
                .catch((error) => {
                    console.log("error in fetchData:", error);
                });
        };

        fetchData();


    }, []);


    return (
        <div className="row">
            <Menu/>
            <Stack direction={"horizontal"}>
                <span className="me-auto"/>
                <div className="col-md-4 d-flex justify-content-center text-center">
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><h1>{code}-Students</h1></TableCell>
                                </TableRow>

                            </TableHead>
                            <TableBody>
                                {Array.from(student)?.map((row) => (
                                    <TableRow key={row.email}>
                                        <TableCell component="th" scope="row">
                                            {row.email}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <span className="me-auto"/>
            </Stack>
        </div>
    );
}


export default CourseStudent;
