import React, {useEffect, useState} from "react";


import "./student.css"
import {Button, Form, Stack} from "react-bootstrap";
import {Card} from "@material-ui/core";
import auth from "../../config/auth";
import {useMutation} from "@apollo/client";
import {AddOrRemoveCourse, CourseByIDQuery} from "../../graphql/mutation";


function AddOrDropCourse(props) {

    const [addOrRemoveCourse, {error}] = useMutation(AddOrRemoveCourse, {
        onCompleted: (data => {
            if (data) {
                window.location.reload();

            }
        }),
        onError: (error => {

        })
    })

    useEffect(() => {
        const loggedInUser = auth.getToken();
        if (loggedInUser === "") {
            window.location.href = `/login`;
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code === '' || code === "-1") {
            alert("Invalid course")
            return
        }
        const type = props.type
        const id=props.id
        addOrRemoveCourse({
            variables: {
                id:id,
                code:code,
                type:type

            }
        })


    };
    const [code, setCode] = useState("");

    return (
        <div className="col-md-4 d-flex ">
            <Card style={{width: "28rem"}}>
                <Form onSubmit={handleSubmit}>
                    <Stack gap={3}>
                        <h1>{props.title} Course</h1>
                        <Form.Select aria-label="Default select example" onChange={e => {
                            console.log("e.target.value", e.target.value);
                            setCode(e.target.value)
                        }}>
                            <option key={0} value="-1">Select a course</option>
                            {
                                props.data?.map((data) => (
                                    <option key={data.code} value={data.code}>{data.code}</option>
                                ))}

                        </Form.Select>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Stack>
                </Form>
            </Card>
        </div>
    );
}


export default AddOrDropCourse;
