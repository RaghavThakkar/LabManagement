import React, { useState } from "react";
import auth from "../../auth/auth"
import "./login.css"
import { Card, Form } from "react-bootstrap";
import api from "../../api";

export default function Login(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload={email,password}
        console.log(payload)
        api.login(payload).then(res=>{
            auth.onAuthentication();
            auth.saveToken(res.data.success);
            window.location.href = `/students`;
        }).catch(error=>{
            alert(error)
        })

    };
    return (
        <div className="main ">
            <div className="login">
                <Card style={{ width: "28rem" }} border="primary">
                    <Card.Body>
                        <Card.Title>
                            <div className="text-center" ><span className="text-dark">Student Login</span></div>
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
                                <br />
                                <button className="btn btn-primary">Login</button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>

            </div>
        </div>
    );
}
