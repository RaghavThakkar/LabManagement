import {Stack} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import auth from "../../config/auth";


export default function Menu(props) {
    const [isLogin, setIsLogin] = useState();
    useEffect(() => {
        const loggedInUser = auth.getToken();
        if (loggedInUser === "") {
            setIsLogin(false)
        } else {
            setIsLogin(true)
        }

    })

    return (<Stack direction="horizontal" className="m-4" gap={3}>

        <span className="me-auto"/>
        <Button href="/home" variant="outline-secondary"> Home</Button>
        <Button href="/patients" variant="outline-secondary"> Courses</Button>
        <Button href="/students" variant="outline-secondary">Students</Button>
        {/* <Button href="/courses" variant="outline-secondary"> Courses</Button>
        <Button href="/students" variant="outline-secondary">Students</Button> */}
        {isLogin &&
            < Button href="/students" onClick={(event => {
                auth.saveToken("")
            })} variant="outline-secondary">Logout</Button>
        }

        <span className="me-auto"/>
    </Stack>)
}