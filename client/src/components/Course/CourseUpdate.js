import React, {useState, useEffect} from "react";
import auth from "../../config/auth";
import {Card, Form} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useQuery, gql, useMutation} from '@apollo/client'
import {CourseByIDQuery, CreateCourse, UpdateCourse} from "../../graphql/mutation";

export default function CourseUpdate(props) {
    const [code, setCode] = useState();
    const [name, setName] = useState();
    const [section, setSection] = useState();
    const [semester, setSemester] = useState();
    const {id} = useParams();

    const [courseById, {error}] = useMutation(CourseByIDQuery, {
        onCompleted: (data => {
            if (data) {
                console.log(data)
                setCode(data.courseById.code)
                setName(data.courseById.name)
                setSection(data.courseById.section)
                setSemester(data.courseById.semester)
            }
        }),
        onError: (error => {

        })
    })

    const [courseUpdate, {updateCourseError}] = useMutation(UpdateCourse,
        {
            onCompleted: (data => {
                window.location.href = `/courses`;
            }),
            onError: (error => {
                alert(error.message)
            }),
        })

    useEffect(() => {
        const loggedInUser = auth.getToken();
        if (loggedInUser === "") {
            window.location.href = `/login`;
        }
        courseById({
            variables: {
                id: id,
            }
        })


    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {code, name, semester, section}
        console.log(payload)
        console.log(id)
        console.log(auth.getToken())
        courseUpdate({
            variables: {
                id:id,
                code: code,
                name:name,
                semester:semester,
                section:section
            }
        })
    };

    return (
        <div className="comment">
            <Card style={{width: "28rem"}}>
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
                            <br/>
                            <button className="btn btn-primary">Submit</button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}