import React, { useState, useEffect } from "react";
import auth from "../../config/auth";
import { Card, Spinner,Table } from "react-bootstrap";
import { useParams,NavLink } from "react-router-dom";
import { useQuery, gql, useMutation } from '@apollo/client'
import { userById } from "../../graphql/queries"

const Patient = () => {
    const { user_id } = useParams()

    const{ loading, error, data, refetch  } = useQuery(userById, {
        variables: {
            id: user_id
        },
    })
    let user = data?.userById
    if(!data?.userById || loading){
        return <Spinner animation="border" role="status" />
      }
    if(!data?.userById || loading){
        return <Spinner animation="border" role="status" />
      }

    return (
        <>
            <Card border="secondary" className='mt-3'>
            <Card.Body>
                <Card.Title>Patient</Card.Title>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>city</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.city}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                    </tr>
                </tbody>
            </Table>
            <div className="w-75 m-auto">
            <NavLink className='btn btn-primary w-100' to={`/patientDailyInfo/${user_id}`}> Add Vital Daily Infor</NavLink>
            </div>
            <div className="w-75 m-auto mt-3">
            <NavLink className='btn btn-success w-100' to={`/patientDailyInfoList/${user_id}`}> Review all vital daily forms</NavLink>
            </div>
            <div className="w-75 m-auto  mt-3">
            <NavLink className='btn btn-primary w-100' to={`/dailyMotivationTipPatient`}> Check Motiviational Tips</NavLink>
            </div>
            <div className="w-75 m-auto mt-3">
            <NavLink className='btn btn-danger w-100' to={`/EmergencyAlert/${user_id}`}> Send Emergency Alert</NavLink>
            </div>
            </Card.Body>
        </Card>
        </>
    )
}

export default Patient
