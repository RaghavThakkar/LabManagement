import React, { useState, useEffect } from "react";
import { Form, Button, FloatingLabel, Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import { userByType } from '../../graphql/queries'
import { useMutation, useQuery } from "@apollo/client";
import {editVitalInfo} from '../../graphql/mutation'
import {vitalInfoListByFormId} from '../../graphql/queries'

function EditDailyInfo() {
    const {form_id} = useParams()
    const [enterVitalInfo, { data:editData, loading:editLoading, error:editError }] = useMutation(editVitalInfo)
    const { data:vitalFormData, loading:vitalFormLoading, error:vitalFormError }= useQuery(vitalInfoListByFormId,{
        variables:{
            id:form_id
        }
    })

    const [daliyInfo, setDailyInfo] = useState({
        heartRate:"",
        weight:"",
        bodyTemperature:"",
        userId: "",
        bloodPressure:"",
        userEmail:"",
        date: "",
        _id:form_id
    })
    useEffect(()=>{
        if(vitalFormData && !editData){
            setDailyInfo(vitalFormData.vitalInfoByID)
            console.log(vitalFormData.vitalInfoByID)
        }
        if(!editData && editLoading){
            return <Spinner animation="border" role="status" />
        }
       
    },[vitalFormData,editData])
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

    const formSubmit = (e) => {
        e.preventDefault()

        enterVitalInfo({ variables: daliyInfo });
        // console.log(data)
        // navigate("/course")
    }

    return (
        <div className='d-flex justify-content-center'>

        <div className='card shadow p-3 mt-5'>
            <h1 className='p-3'>Daily Information</h1>

            <Form onSubmit={e => formSubmit(e)}>

            <FloatingLabel label="Email" className="mb-3" controlId="bodytemprature">
                    <Form.Control type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} value={daliyInfo.userEmail} />
                </FloatingLabel>

                <FloatingLabel label="Body Temparature" className="mb-3" controlId="bodytemprature">
                    <Form.Control type="text" placeholder="0" onChange={e => setBodyTemperature(e.target.value)} value={daliyInfo.bodyTemperature} />
                </FloatingLabel>
                <FloatingLabel label="Heart Rate" className="mb-3" controlId="lastname">
                    <Form.Control type="text" placeholder="0" onChange={e => setRate(e.target.value)} value ={daliyInfo.heartRate}/>
                </FloatingLabel>

                <FloatingLabel label="Weight" className="mb-3" controlId="Weight">
                    <Form.Control type="text" placeholder="Weight" onChange={e => setWeight(e.target.value)} value ={daliyInfo.weight}/>
                </FloatingLabel>

                <FloatingLabel label="Blood Pressure" className="mb-3" controlId="BloodPressure">
                    <Form.Control type="text" placeholder="0" onChange={e => setBloodPressure(e.target.value)} value ={daliyInfo.bloodPressure} />
                </FloatingLabel>

                <FloatingLabel label="Date" className="mb-3" controlId="Date">
                    <Form.Control type="text" value ={daliyInfo.date} readOnly/>
                </FloatingLabel>

                <Button variant="success" className="px-5"type="submit">
                    Edit
                </Button>
            </Form>
        </div>
    </div>
    )
}

export default EditDailyInfo