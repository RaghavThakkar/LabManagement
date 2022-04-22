import React, { useEffect, useInsertionEffect, useState } from 'react'
import { Form, Button, FloatingLabel, Card ,Table,Spinner} from "react-bootstrap"
import { useNavigate, useParams,NavLink } from "react-router-dom";
import { registration } from '../../graphql/mutation'
import { useQuery, useMutation } from "@apollo/client";
import {userById} from "../../graphql/queries"

const Nurse = () => {
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
      console.log(user)

    return (
        <>
            <Card border="secondary" className='mt-3'>
            <Card.Body>
                <Card.Title>Nurse</Card.Title>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.phone}</td>
                    </tr>
                </tbody>
            </Table>
            <NavLink className='btn btn-primary' to='/patients'>Check Patients</NavLink>
            </Card.Body>
        </Card>
        </>
    )
}

export default Nurse