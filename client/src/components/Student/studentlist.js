import React, {useEffect, useState} from "react";
import auth from "../../config/auth"
import ReactTable from "react-table";
import styled from "styled-components";
import "./student.css"
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
import Menu from "../Common/common";
import {Stack} from "react-bootstrap";

import {useQuery, gql, useMutation} from '@apollo/client'
import {DeleteCourseById, DeleteStudentId, StudentsQuery} from "../../graphql/queries";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


function DeleteStudent(props) {

    const  [deleteById, {error}]=useMutation(DeleteStudentId,{
        onCompleted: (data => {
            window.location.href = `/courses`;
        }),
        onError: (error => {
            alert(error.message)
        }),
    })
    const deleteCourse = (event) => {
        event.preventDefault();

        if (
            window.confirm(`Do you want to delete the Student ${props.name} permanently?`)
        ) {
            deleteById({
                variables: {
                    id: props.id,
                }
            })
        }
    };
    return <Button onClick={deleteCourse}>Delete</Button>;
}
function AddCourse(props){
    const addCourse = (event) => {
        event.preventDefault();
        window.location.href = `/student/add/${props.id}`;
    };
    return <Button onClick={addCourse}>AddCourse</Button>;
}

function ViewAllCourse(props){
    const viewAllCourse = (event) => {
        event.preventDefault();
        window.location.href = `/studentDetail/${props.id}`;
    };
    return <Button onClick={viewAllCourse}>View Courses</Button>;
}
function StudentList(props) {

    const  {error, loading,data}=useQuery(StudentsQuery)
    const [students, setStudent] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

        const loggedInUser = auth.getToken();
        if (loggedInUser === "") {
            window.location.href = `/login`;
        }
        if(data) {
            console.log(data)
            setStudent(data.students);
            setLoading(false);
        }
    }, [data]);


    const columns = [

        {
            Header: "Firstname",
            accessor: "firstName",
        }
    ];

    let showTable = true;
    if (!students.length) {
        showTable = false;
        return ""
    }

    return (
        <div className="row">

            <Stack gap={3} className=" justify-content-center">
            <Menu/>
            <div className="d-flex justify-content-center text-center" >

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell align="right"><b>FirstName</b></TableCell>
                                <TableCell align="right"><b>LastName</b></TableCell>
                                <TableCell align="right"><b>Address</b></TableCell>
                                <TableCell align="right"><b>City</b></TableCell>
                                <TableCell align="right"><b>Phone</b></TableCell>
                                <TableCell align="right"><b>Program</b></TableCell>
                                <TableCell align="right"><b>Courses</b></TableCell>
                                <TableCell align="right"><b>Delete</b></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {students.map((row) => (
                                <TableRow key={row.email}>
                                    <TableCell component="th" scope="row">
                                        {row.email}
                                    </TableCell>
                                    <TableCell align="right">{row.firstName}</TableCell>
                                    <TableCell align="right">{row.lastName}</TableCell>
                                    <TableCell align="right">{row.address}</TableCell>
                                    <TableCell align="right">{row.city}</TableCell>
                                    <TableCell align="right">{row.phone}</TableCell>
                                    <TableCell align="right">{row.program}</TableCell>
                                    <TableCell align="right"><ViewAllCourse id={row._id}/></TableCell>
                                    <TableCell align="right"><DeleteStudent id={row._id}
                                        name={row.email}/></TableCell>
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


export default StudentList;
