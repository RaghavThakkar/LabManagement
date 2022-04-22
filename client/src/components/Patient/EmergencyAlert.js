import React, { useEffect, useState } from 'react'
import { Form, Button, FloatingLabel, Card,Spinner } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom';
import { userByType } from '../../graphql/queries'
import { useMutation, useQuery } from "@apollo/client";
import { CreateEmergencyAlert } from '../../graphql/mutation'
import { userById } from "../../graphql/queries"

function EmergencyAlert() {

    const [emergency, setEmergency] = useState({
        userEmail: "",
        message: "",
        email: ""
    })
    const {patient_id} = useParams()
    const navigator = useNavigate()

    const [createEmergencyAlert, { data:EmData, loading:EmLaoding, error:EmError }] = useMutation(CreateEmergencyAlert)

    const{ loading:pLoading, error:pError, data:pData, refetch  } = useQuery(userById, {
        variables: {
            id: patient_id
        },
    })

    useEffect(()=> {
        if(!pData && pLoading){
            return <Spinner animation="border" role="status" />
        }

        if(!EmData && EmLaoding){
            return <Spinner animation="border" role="status" />
        }

        if(pData && !EmData){
            setEmergency({...emergency, userEmail: pData.userById.email })
        }

        if(EmData){
            navigator(`/patient/${patient_id}`)
        }

    },[EmData,pData])

    const setuserEmail = (input) => {
        setEmergency({ ...emergency, userEmail: input })
    }
    const setmessage = (input) => {
        setEmergency({ ...emergency, message: input })
    }
    const setemail = (input) => {
        setEmergency({ ...emergency, email: input })
    }

    const formSubmit = (e) => {
        e.preventDefault()

        createEmergencyAlert({ variables: emergency });
        // console.log(data)
        // navigate("/course")
    }


    return (
        <>
            <Card border="secondary" className='mt-3'>
                <Card.Body>
                    <Card.Title>Send Emergency Alert</Card.Title>
                    <Form onSubmit={e => formSubmit(e)}>

                        <FloatingLabel label="Your Email" className="mb-3" controlId="bodytemprature">
                            <Form.Control type="text" placeholder="Your Email" onChange={e => setuserEmail(e.target.value)} value={emergency.userEmail} />
                        </FloatingLabel>
                        <FloatingLabel label="Message" className="mb-3" controlId="lastname">
                            <Form.Control type="text" placeholder="0" onChange={e => setmessage(e.target.value)} />
                        </FloatingLabel>

                        <FloatingLabel label="Emergency contact Email" className="mb-3" controlId="Weight">
                            <Form.Control type="text" placeholder="Emergency contact Email" onChange={e => setemail(e.target.value)} />
                        </FloatingLabel>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>

    )
}

export default EmergencyAlert