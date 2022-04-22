import React, { useEffect, useState } from 'react'
import { Card, Button, Table, Spinner } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom';
import { userByType } from '../../graphql/queries'
import { useMutation, useQuery } from "@apollo/client";
import { vitalInfoListByUserId } from "../../graphql/queries"

function PatientDailyInfoList() {
  const {patient_id} = useParams()
    const { error, loading, data } = useQuery(vitalInfoListByUserId, {
      variables: {
        userId: patient_id
      },
    })
    const [daliyInfos, setDaliyInfos] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
      if (data) {
        console.log(data)
        setDaliyInfos(data.vitalInfoByUserId);
      }
      if(!data|| loading){
        return <Spinner animation="border" role="status" />
      }
    }, data)
  
    const editDailyForm = (formId) => {
      navigate( `/patientDailyInfo/form/${formId}`)
    }
  
    return (
      <Card style={{ width: "58rem" }} border="secondary" className='mt-3'>
      <Card.Body>
          <Card.Title>Daily Vital Info List for Patient {patient_id}</Card.Title>
<Table striped bordered hover size="sm">
  
          <thead>
            <tr>
              <td align="center"><b>Date</b></td>
              <td align="center"><b>Review/Edit</b></td>
              </tr>
          </thead>
          <tbody>
  
            {daliyInfos.map((row,index) => (
              <tr key={index}>
                <td align="center">{row.date}</td>
                <td align="center">
                  <Button className='btn btn-primary' onClick={()=>editDailyForm(`${row._id}`)}>Review/Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Card.Body>
        </Card>
    )
  }
  
  export default PatientDailyInfoList