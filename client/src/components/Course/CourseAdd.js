import React, { useState, useEffect } from "react";
import auth from "../../auth/auth";
import { Card, Form } from "react-bootstrap";
import api from "../../api";



export default function CourseAdd(props) {
    const [code, setCode] = useState();
    const [name, setName] = useState();
    const [section, setSection] = useState();
    const [semester, setSemester] = useState();

    useEffect(() => {
        const loggedInUser = auth.getToken();
        if (loggedInUser === "") {
            window.location.href = `/login`;
        }

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload={code,name,semester,section}
        api.addCourse(payload).then(res=>{
            window.location.href = `/courses`;
        }).catch(err=>{
            alert(err)
        })
    };

    return (
        <div className="comment">
            <Card style={{ width: "28rem" }}>
                <Card.Body>
                    <Card.Title>
                        <i>Add Course</i>
                    </Card.Title>
                    <Form className="comment-form" onSubmit={handleSubmit}>
                        <Form.Group controlId="code">
                            <Form.Label>Course Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Course Code"
                                name="code"
                                onChange={(e) => setCode(e.target.value)}
                                required
                                value={code}
                            />
                        </Form.Group>

                        <Form.Group controlId="name">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Course Name"
                                value={name}
                                name="name"
                            />
                        </Form.Group>

                        <Form.Group controlId="section">
                            <Form.Label>Section</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setSection(e.target.value)}
                                placeholder="Enter section"
                                name="topic"
                                value={section}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="semester">
                            <Form.Label>Semester</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setSemester(e.target.value)}
                                placeholder="Enter Semester"
                                name="semester"
                                value={semester}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="button">
                            <br />
                            <button class="btn btn-primary">Submit</button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}