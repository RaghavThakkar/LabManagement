import React, { useState, useEffect } from "react";
import { Form, Button, FloatingLabel, Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import { userByType } from '../../graphql/queries'
import { useMutation, useQuery } from "@apollo/client";
import { EnterVitalInfo } from "../../graphql/mutation"

function PatientDailyInfo() {
    const {patient_id} = useParams()
    const [enterVitalInfo, { data, loading, error }] = useMutation(EnterVitalInfo)

    const [daliyInfo, setDailyInfo] = useState({
        userEmail:"",
        heartRate:"",
        bloodPressure:"",
        bodyTemperature:"",
        weight:"",
        userId: patient_id,
        date: new Date().toISOString()
    })
    const navigate = useNavigate()



      useEffect(()=>{
        if(data?.enterVitalInfo.success){
            navigate(`/patientDailyInfoList/${patient_id}`)
        }
    
        if(!data?.enterVitalInfo.success || loading){
            return <Spinner animation="border" role="status" />
          }
      },data)

    const setBodyTemperature = (input) =>{
        setDailyInfo({...daliyInfo,bodyTemperature:input})
    }

    const setRate = (input) =>{
        setDailyInfo({...daliyInfo,heartRate:input})
    }

    const setWeight = (input) =>{
        setDailyInfo({...daliyInfo,weight:input})
    }

    const  setBloodPressure = (input) =>{
        setDailyInfo({...daliyInfo,bloodPressure:input})
    }
    const  setEmail = (input) =>{
        setDailyInfo({...daliyInfo,userEmail:input})
    }
    

    const formSubmit = async (e) => {
        e.preventDefault()

       await enterVitalInfo({ variables: daliyInfo });
       console.log(data?.enterVitalInfo.success)
        // console.log(data)
        // navigate("/course")
    }

    return (
        <div className='d-flex justify-content-center'>

            <div className='card shadow p-3 mt-5'>
                <h1 className='p-3'>Daily Information</h1>

                <Form onSubmit={e => formSubmit(e)}>

                <FloatingLabel label="Email" className="mb-3" controlId="bodytemprature">
                        <Form.Control type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel label="Body Temparature" className="mb-3" controlId="bodytemprature">
                        <Form.Control type="text" placeholder="0" onChange={e => setBodyTemperature(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel label="Heart Rate" className="mb-3" controlId="lastname">
                        <Form.Control type="text" placeholder="0" onChange={e => setRate(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel label="Weight" className="mb-3" controlId="Weight">
                        <Form.Control type="text" placeholder="Weight" onChange={e => setWeight(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel label="Blood Pressure" className="mb-3" controlId="BloodPressure">
                        <Form.Control type="text" placeholder="0" onChange={e => setBloodPressure(e.target.value)} />
                    </FloatingLabel>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default PatientDailyInfo