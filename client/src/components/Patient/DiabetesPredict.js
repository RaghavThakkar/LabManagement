import React, {useState, useEffect} from "react";
import {Form, Button, FloatingLabel, Spinner, Modal} from "react-bootstrap"
import {useNavigate, useParams} from "react-router-dom";
import {userByType} from '../../graphql/queries'
import {useMutation, useQuery} from "@apollo/client";
import {EnterVitalInfo} from "../../graphql/mutation"
import axios from "axios";

function PatientDailyInfo() {

    const [daliyInfo, setDailyInfo] = useState({
        heartRate: "",
        bloodPressure: "",
        bodyTemperature: "",
        weight: "",
        respiratoryrate:"",
        age: "",
        date: new Date().toISOString()
    })
    const navigate = useNavigate()



    const handleClose = () => {
        setShow(false)
    }

    const setBodyTemperature = (input) => {
        setDailyInfo({...daliyInfo, temperature: input})
    }

    const setRate = (input) => {
        setDailyInfo({...daliyInfo, pluseRate: input})
    }

    const setWeight = (input) => {
        setDailyInfo({...daliyInfo, weight: input})
    }

    const setBloodPressure = (input) => {
        setDailyInfo({...daliyInfo, bloodPressure: input})
    }
    const setrespiratoryrate = (input) => {
        setDailyInfo({...daliyInfo, respiratoryrate: input})
    }
    const setEmail = (input) => {
        setDailyInfo({...daliyInfo, userEmail: input})
    }

    const setAge = (input) => {
        setDailyInfo({...daliyInfo, age: input})
    }

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const [result, setResult] = useState()

    const formSubmit = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                "Content-Type": "Application/json"
            }
        }

        const body = [daliyInfo]

        try {
            const res = await axios.post(
                "http://localhost:12345/predict",
                body,
                config
            )

            setResult(res.data)
            setShow(true)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='d-flex justify-content-center'>

            <div className='card shadow p-3 mt-5'>
                <h1 className='p-3'>Diabetes Predict</h1>

                <Form onSubmit={e => formSubmit(e)}>


                    <FloatingLabel label="Body Temparature" className="mb-3" controlId="bodytemprature">
                        <Form.Control type="text" placeholder="0" onChange={e => setBodyTemperature(e.target.value)}/>
                    </FloatingLabel>
                    <FloatingLabel label="Heart Rate" className="mb-3" controlId="lastname">
                        <Form.Control type="text" placeholder="0" onChange={e => setRate(e.target.value)}/>
                    </FloatingLabel>

                    <FloatingLabel label="Weight" className="mb-3" controlId="Weight">
                        <Form.Control type="text" placeholder="Weight" onChange={e => setWeight(e.target.value)}/>
                    </FloatingLabel>

                    <FloatingLabel label="Age" className="mb-3" controlId="Age">
                        <Form.Control type="text" placeholder="Age" onChange={e => setAge(e.target.value)}/>
                    </FloatingLabel>

                    <FloatingLabel label="Respiratory Rate" className="mb-3" controlId="Age">
                        <Form.Control type="text" placeholder="respiratoryrate" onChange={e => setrespiratoryrate(e.target.value)}/>
                    </FloatingLabel>

                    <FloatingLabel label="Blood Pressure" className="mb-3" controlId="BloodPressure">
                        <Form.Control type="text" placeholder="0" onChange={e => setBloodPressure(e.target.value)}/>
                    </FloatingLabel>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Prediction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    According to the model, the patient{" "}
                    {result?.prediction ? "" : "does not"}has diabetes
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PatientDailyInfo