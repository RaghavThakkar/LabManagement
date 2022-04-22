import React, { useEffect, useState } from 'react'
import { Card, Button, Table } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { userByType } from '../../graphql/queries'
import { useMutation, useQuery } from "@apollo/client";

function PatientList() {
  const { error, loading, data } = useQuery(userByType, {
    variables: {
      type: "Patient"
    },
  })
  const navigate = useNavigate()
  const [patients, setPatients] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    // const loggedInUser = auth.getToken();
    // if (loggedInUser === "") {
    //   window.location.href = `/login`;
    // }
    if (data) {
      console.log(data)
      setPatients(data.userByType);
      setLoading(false);
    }
  }, data)

  const checkDetail = (userId) => {
    navigate(`/patient/${userId}`)
  }

  const reviewDailyform = (userId) => {
    navigate(`/patientDailyInfoList/${userId}`)
  }

  const addDailyform = (userId) => {
    navigate(`/patientDailyInfo/${userId}`)
  }
  const addMotform = () => {
    navigate(`/createDailyMotivationTip`)
  }

  const findMotforms = () => {
    navigate(`/dailyMotivationTipPatient`)
  }

  return (
    <>
      <Card border="secondary" className='mt-3'>
        <Card.Body>
          <Card.Title>Patient List</Card.Title>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <td align="center"><b>First Name</b></td>
                <td align="center"><b>Last Name</b></td>
                <td align="center"><b>Detail</b></td>
                <td align="center"><b>Review Daily Forms</b></td>
                <td align="center"><b>Add Daily Forms</b></td>
              </tr>
            </thead>
            <tbody>

              {patients.map((row, index) => (
                <tr key={index}>
                  <td align="center">{row.firstName}</td>
                  <td align="center">{row.lastName}</td>
                  <td align="center">
                    <Button variant="outline-primary" onClick={() => checkDetail(`${row._id}`)}>Detail</Button>
                  </td>
                  <td align="center">
                    <Button variant="outline-success" onClick={() => reviewDailyform(`${row._id}`)}>Review Daily Forms</Button>
                  </td>
                  <td align="center">
                    <Button variant="outline-danger" onClick={() => addDailyform(`${row._id}`)}>Add Vital Daily Form</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="warning" onClick={() => addMotform()}>Add Motivational Tip</Button>
          <Button variant="primary" className="mx-2" onClick={() => findMotforms()}>review all Motivational Tips</Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default PatientList