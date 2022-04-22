import React, { useEffect, useState } from 'react'
import { Form, Button, FloatingLabel, ToggleButton, ButtonGroup, Card,Spinner } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { registration } from '../../graphql/mutation'
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setUserInfo, setToken } from '../../redux/auth-redux';

const SignUp = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userState, setState] = useState({
        firstName: "",
        lastName: "",
        password: "",
        usertype: "",
        email: "",
        city: "",
        address: "",
        phone: ""

    })


    const [register, { data,loading,error }] = useMutation(registration)

    useEffect(() => {
        // const loggedInUser = auth.getToken();
        // if (loggedInUser === "") {
        //   window.location.href = `/login`;
        // }
        if(loading){
            return <Spinner animation="border" role="status" />
        }
        if(data){
            dispatch(setUserInfo(data?.registration))
            console.log(data)
            if(userState.usertype==='Patient'){
                navigate(`/patient/${data.registration._id}`)
            }
            else{
                navigate(`/nurse/${data.registration._id}`)
            }
        }
      }, data)

    const setFirstname = (input) => {
        setState({ ...userState, firstName: input })
    }

    const setLastname = (input) => {
        setState({ ...userState, lastName: input })
    }

    const setPassword = (passwordInput) => {
        setState({ ...userState, password: passwordInput })
        console.log(userState)
    }

    const setAddress = (input) => {
        setState({ ...userState, address: input })
        console.log(userState)
    }
    const setCity = (input) => {
        setState({ ...userState, city: input })
        console.log(userState)
    }
    const setPhoneNumber = (input) => {
        setState({ ...userState, phone: input })
        console.log(userState)
    }

    const setRadioValue = (input) => {
        setState({ ...userState, usertype: input })
    }

    const setEmail = (input) => {
        setState({ ...userState, email: input })
    }

    const formSubmit = async (e) => {
        e.preventDefault()
        await register({
            variables: userState
        })
    }

    return (
        <Card border="secondary" className='m-auto mt-3 w-75'>
            <Card.Body>
                <Card.Title>
                    <div className="text-center"><span className="text-dark">Register</span></div>
                </Card.Title>
                <Form onSubmit={e => formSubmit(e)}>

                    <FloatingLabel label="First name" className="mb-3" controlId="firstname">
                        <Form.Control type="text" placeholder="first name" onChange={e => setFirstname(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel label="Last name" className="mb-3" controlId="lastname">
                        <Form.Control type="text" placeholder="last name" onChange={e => setLastname(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel label="Email" className="mb-3" controlId="email">
                        <Form.Control type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel label="Password" className="mb-3" controlId="password">
                        <Form.Control type="text" placeholder="password" onChange={e => setPassword(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel label="Address" className="mb-3" controlId="address">
                        <Form.Control type="text" placeholder="address" onChange={e => setAddress(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel label="City" className="mb-3" controlId="city">
                        <Form.Control type="text" placeholder="city" onChange={e => setCity(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel label="Phone number" className="mb-3" controlId="phoneNumber">
                        <Form.Control type="number" placeholder="000 000 0000" onChange={e => setPhoneNumber(e.target.value)} />
                    </FloatingLabel>

                    {/* <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="isnurse"
                    value="patient" />
                <label class="form-check-label margin-bottom" for="inlineRadio1">Patient</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="isnurse"
                    value="nurse" />
                <label class="form-check-label margin-bottom" for="inlineRadio2">Nurse</label>
            </div> */}
                    <ButtonGroup>
                        <ToggleButton variant="outline-success" id='tb-patient' type='radio' name='radio' value='Patient' onChange={(e) => setRadioValue(e.currentTarget.value)}>Patient</ToggleButton>
                        <ToggleButton variant="outline-success" id='tb-nurse' type='radio' name='radio' value='Nurse' onChange={(e) => setRadioValue(e.currentTarget.value)}>Nurse</ToggleButton>
                    </ButtonGroup>
                    <div className='mt-2'>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                    <div className='mt-2'>
                        <a className='btn btn-outline-primary' href='/login'>
                            Login
                        </a>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default SignUp