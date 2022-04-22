import './App.css';
import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Brand } from 'react-bootstrap'

import "bootstrap/dist/css/bootstrap.css";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/signup"

import Patient from "./components/Patient/Patient"
import Nurse from "./components/Nurse/Nurse"
import PatientList from "./components/Nurse/PatientList";
import PatientDailyInfo from "./components/Patient/PatientDailyInfo";
import EmergencyAlert from './components/Patient/EmergencyAlert';
import DailyMotivationTipNurse from './components/Nurse/DailyMotivationTipNurse';
import DailyMotivationTipPatient from './components/Patient/DailyMotivationTipPatient';
import EditDailyInfo from './components/Patient/EditDailyInfo';
import PatientDailyInfoList from './components/Patient/PatientDailyInfoList';

import { useAppApolloClient } from "./config/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { Provider, useSelector } from 'react-redux'
import createStore from './redux/store'
import DiabetesPredict from "./components/Patient/DiabetesPredict";

function App() {
    const apolloClient = useAppApolloClient();

    return (
        <ApolloProvider client={apolloClient}>
            <Provider store={createStore}>
                <div className="wrapper">
                    <Router>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route exact path="/" element={<Register />} />
                                <Route exact path="/login" element={<Login />} />
                                <Route exact path="/patients" element={<PatientList />} />
                                <Route exact path="/patient/:user_id" element={<Patient />} />
                                <Route exact path="/nurse/:user_id" element={<Nurse />} />
                                <Route exact path="/patientDailyInfo/:patient_id" element={<PatientDailyInfo />} />
                                <Route exact path="/patientDailyInfoList/:patient_id" element={<PatientDailyInfoList />} />
                                <Route exact path="/patientDailyInfo/form/:form_id" element={<EditDailyInfo />} />
                                <Route exact path="/createDailyMotivationTip" element={<DailyMotivationTipNurse />} />
                                <Route exact path="/dailyMotivationTipPatient" element={<DailyMotivationTipPatient />} />
                                <Route exact path="/dp" element={<DiabetesPredict />} />
                                <Route exact path="/EmergencyAlert/:patient_id" element={<EmergencyAlert />} />
                            </Route>
                        </Routes>
                    </Router>
                </div>
            </Provider>
        </ApolloProvider>

    );
}

function Layout() {
    const user = useSelector((state) => state.user.user)
    if (user.token) {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        {
                            user.usertype === 'Patient' ?
                                (
                                    <>
                                    <Navbar.Brand>
                                        <Link to={`/patient/${user.userId}`}>home</Link>
                                    </Navbar.Brand>
                                    <Navbar.Brand>
                                        <Link to={`/patientDailyInfoList/${user.userId}`}>Vital Info List</Link>
                                    </Navbar.Brand>
                                    <Navbar.Brand>
                                        <Link to={`/dailyMotivationTipPatient`}>Motivational Tips</Link>
                                    </Navbar.Brand>
                                    </>
                                )
                                :
                                (
                                    <>
                                    <Navbar.Brand>
                                        <Link to={`/nurse/${user.userId}`}>home</Link>
                                    </Navbar.Brand>
                                    <Navbar.Brand>
                                        <Link to={`/patients`}>Patient List</Link>
                                    </Navbar.Brand>
                                    <Navbar.Brand>
                                        <Link to={`/dailyMotivationTipPatient`}>Motivational Tips</Link>
                                    </Navbar.Brand>
                                    </>
                                )

                        }

                        <Navbar.Brand href="/">log out</Navbar.Brand>
                        {
                            user.usertype === 'Patient' ?
                                <Nav to={`/patient/${user.userId}`} element={<Patient />} ></Nav> :
                                <Nav to={`/nurse/${user.userId}`} element={<Nurse />} ></Nav>
                        }
                        <Nav className="me-auto">
                        </Nav>
                    </Container>
                </Navbar>
                <Container className='mt-3 col-12'>
                    {/* <h1>child</h1> */}
                    <Outlet />
                </Container>

            </>
        );
    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <Link to="/login">
                            Login</Link></Navbar.Brand>
                    <Navbar.Brand>
                        <Link to="/">
                            Sign up</Link></Navbar.Brand>
                    <Nav path="/" element={<Register />} />
                    <Nav className="me-auto">
                    </Nav>
                </Container>
            </Navbar>
            <Container className='mt-3 col-12'>
                {/* <h1>child</h1> */}
                <Outlet />
            </Container>

        </>
    );
}

export default App;
