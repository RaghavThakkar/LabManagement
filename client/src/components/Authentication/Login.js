import React, {useState} from "react";
import auth from "../../config/auth"
import {Card, Form} from "react-bootstrap";
import { useNavigate,useLocation } from 'react-router-dom';
import {LoginMutation} from '../../graphql/mutation'
import {useMutation} from "@apollo/client";
import { useDispatch } from "react-redux";
import { setUserInfo, setToken } from '../../redux/auth-redux';
export default function Login(props) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [login, {error}] = useMutation(LoginMutation,
        {
            onCompleted: (data => {
                auth.onAuthentication();
                auth.saveToken(data.login.token)
                dispatch(setUserInfo(data?.login))
                if(data.login.usertype === "Patient"){
                    navigate(`/patient/${data.login.userId}`)
                }
                else{
                    navigate(`/nurse/${data.login.userId}`)
                }
                
            }),
            onError: (error => {
                alert(error.message)
                navigate(from,{replace: true})
            }),
        })
        let from = location.state?.from?.pathname || "/";
    const handleSubmit = (e) => {
        e.preventDefault();
        login({
            variables: {
                email: email,
                password: password
            }
        })

    };
    return (
        <div className="main ">
            <div className="login">
                <Card style={{width: "28rem"}} border="primary" className="m-auto mt-3">
                    <Card.Body>
                        <Card.Title>
                            <div className="text-center"><span className="text-dark">User Login</span></div>
                        </Card.Title>
                        <Form className="login-form" onSubmit={handleSubmit}>
                            <Form.Group controlId="Email">
                                <Form.Label className="text-dark">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control input-field"
                                />
                            </Form.Group>

                            <Form.Group controlId="Password">
                                <Form.Label className="text-dark">password</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control input-field"
                                />
                            </Form.Group>

                            <Form.Group controlId="button">
                                <br/>
                                <button className="btn btn-primary">Login</button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>

            </div>
        </div>
    );
}
