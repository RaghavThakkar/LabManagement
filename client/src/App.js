import './App.css';
import React, {useState} from "react";

import {BrowserRouter, Route, Routes, Redirect} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import Login from "./components/Login/login";
import StudentList from "./components/Student/studentlist";
import CourseList from "./components/Course/CourseList";
import CourseAdd from "./components/Course/CourseAdd";
import CourseUpdate from "./components/Course/CourseUpdate";

import StudentDetails from "./components/Student/StudentDetails";
import CourseStudent from "./components/Student/CourseStudent";
import {useAppApolloClient} from "./config/apolloClient";
import {ApolloProvider} from "@apollo/client";

function App() {
    const apolloClient = useAppApolloClient();

    return (
        <ApolloProvider client={apolloClient}>
            <div className="wrapper">
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Login/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/students" element={<StudentList/>}/>
                        <Route exact path="/studentDetail/:id" element={<StudentDetails/>}/>
                        <Route exact path="/courses" element={<CourseList/>}/>
                        <Route exact path="/course/add" element={<CourseAdd/>}/>
                        <Route exact path="/course/update/:id" element={<CourseUpdate/>}/>
                        <Route exact path="/course/students/:code" element={<CourseStudent/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </ApolloProvider>

    );
}

export default App;
