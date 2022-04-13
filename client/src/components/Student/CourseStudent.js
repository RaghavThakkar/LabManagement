import React, {useEffect, useRef, useState} from "react";

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
import auth from "../../config/auth";
import Menu from "../Common/common";
import {useQuery} from "@apollo/client";
import {StudentByCourseCode} from "../../graphql/queries";
;


function CourseStudent(props) {


    const [student, setStudent] = useState("");

    const {code} = useParams();

    const {error, loading, data} = useQuery(StudentByCourseCode, {
        variables: {
            code
        },


    })
    useEffect(() => {
        const loggedInUser = auth.getToken();
        if (loggedInUser === "") {
            window.location.href = `/login`;
        }

        console.log(data)
        if(data){
            setStudent(data.studentByCourseCode);
        }


    }, data);


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
