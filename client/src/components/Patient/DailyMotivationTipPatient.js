import React, { useEffect, useInsertionEffect, useState } from 'react'
import { Form, Button, FloatingLabel, Card, Table,Spinner } from "react-bootstrap"
import { useNavigate, NavLink } from "react-router-dom";
import { registration } from '../../graphql/mutation'
import { useQuery } from "@apollo/client";
import { motivationalList } from '../../graphql/queries'

const DailyMotivationTipPatient = () => {
    const {data, loading, error} = useQuery(motivationalList)
    const [tips, setTips] = useState([])


    useEffect(()=>{
        if (!tips || loading) {
            return <Spinner animation="border" role="status" />
        }
        if (data) {
            console.log(data)
            setTips(data.motivationalList);
          }
    },data)

    return (
        <Card border="secondary" className='mt-3'>
        <Card.Body>
            <Card.Title>Motivational Tips List</Card.Title>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>URL</th>
                </tr>
            </thead>
            <tbody>
                {tips.map((c) => (
                    <tr>
                        <td>{c?.title}</td>
                        <td>{c?.description}</td>
                        <td><a className='btn btn-primary' href= {`${c?.videoURL}`} target="_blank">{c?.videoURL}</a></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </Card.Body>
      </Card>
    )
}

export default DailyMotivationTipPatient